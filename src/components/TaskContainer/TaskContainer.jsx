import { doc } from "firebase/firestore";
import React from "react";
import TaskPreviewCard from "../TaskPreviewCard/TaskPreviewCard";
import * as S from "./style";
import { useFirestoreDocumentMutation } from "@react-query-firebase/firestore";
import { db } from "../../firebase";
import { useAuthContext } from "../../contexts/AuthContext";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const TaskContainer = ({
  title,
  taskList,
  AddTaskForm,
  filter,
  project,
  projectId,
}) => {
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();
  const ref = doc(db, "projects", projectId);
  const mutation = useFirestoreDocumentMutation(ref, {
    merge: true,
  });

  const handleClick = (task) => {
    navigate(`/project/${projectId}/task/${task.task_id}`);
  };

  const submitHandler = (taskTitle) => {
    if (!taskTitle) {
      return;
    }

    let newTaskToAdd = {
      task_id: uuidv4(),
      title: taskTitle,
      description: "",
      comments: [],
      assignee: [],
      addedBy: { id: currentUser.uid, name: currentUser.displayName },
      created_at: Date.now(),
      done: false,
    };
    try {
      mutation.mutate({
        tasks: [...project.tasks, newTaskToAdd],
      });
    } catch (err) {
      console.log(err);
    }
  };
  return taskList.length > 0 || AddTaskForm ? (
    <S.Wrapper>
      <S.Header>{title}</S.Header>
      <div
        style={{
          overflowY: "auto",
          maxHeight: "50vh",
        }}
      >
        {filter && filter}
        {taskList.map((task, index) => {
          return (
            <div key={`${task}-${index}`} onClick={() => handleClick(task)}>
              <TaskPreviewCard task={task} />
            </div>
          );
        })}
      </div>
      {AddTaskForm && <AddTaskForm submitHandler={submitHandler} />}
    </S.Wrapper>
  ) : null;
};

export default TaskContainer;
