import { doc } from "firebase/firestore";
import React from "react";
import TaskPreviewCard from "../TaskPreviewCard/TaskPreviewCard";
import * as S from "./style";
import { useFirestoreDocumentMutation } from "@react-query-firebase/firestore";
import { db } from "../../firebase";
import { useAuthContext } from "../../contexts/AuthContext";

const TaskContainer = ({
  title,
  taskList,
  AddTaskForm,
  filter,
  project,
  id,
}) => {
  const { currentUser } = useAuthContext();

  const ref = doc(db, "projects", id);
  const mutation = useFirestoreDocumentMutation(ref, {
    merge: true,
  });

  const submitHandler = (taskTitle) => {
    if (!taskTitle) {
      return;
    }

    let newTaskToAdd = {
      title: taskTitle,
      description: "",
      comments: [],
      assignee: [],
      addedBy: currentUser.uid,
      created_at: Date.now(),
      id: "some id",
      done: false,
    };
    mutation.mutate({
      tasks: [...project.tasks, newTaskToAdd],
    });
  };
  return (
    <S.Wrapper>
      <S.Header>{title}</S.Header>
      {filter && filter}
      {taskList &&
        taskList.map((task, index) => {
          return (
            <div key={`${task}-${index}`}>
              <TaskPreviewCard task={task} />
            </div>
          );
        })}

      {AddTaskForm && <AddTaskForm submitHandler={submitHandler} />}
    </S.Wrapper>
  );
};

export default TaskContainer;
