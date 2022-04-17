import React, { useEffect, useRef, useState } from "react";
import Collaborators from "../../components/Collaborators/Collaborators";
import * as S from "./style";
import * as SharedStyle from "../ProjectPage/style";
import arrow from "../../assets/svg/arrow.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useProjectContext } from "../../contexts/ProjectContext";
import { getDateAndTime } from "../../components/utils/utils";
import AutoTextArea from "../../components/AddTaskForm/AutoTextArea";
import { doc } from "firebase/firestore";
import { useFirestoreDocumentMutation } from "@react-query-firebase/firestore";
import { db } from "../../firebase";

const TaskPage = () => {
  const { project_id, task_id } = useParams();
  const { collaborators, tasks } = useProjectContext();
  const navigate = useNavigate();

  const inputRef = useRef();
  const textAreaRef = useRef(null);

  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [task, setTask] = useState();

  const ref = doc(db, "projects", project_id);
  const mutation = useFirestoreDocumentMutation(ref, {
    merge: true,
  });

  useEffect(() => {
    if (tasks) {
      setTask(tasks.filter((t) => t.task_id === task_id)[0]);
      setTaskName(tasks.filter((t) => t.task_id === task_id)[0].title);
      setDescription(tasks.filter((t) => t.task_id === task_id)[0].description);
    }
  }, [tasks]);

  const handleSubmitDescriprion = async (e) => {
    e.preventDefault();
    updateTask("description", textAreaRef.current.value);
  };

  const updateTask = (key, newValue) => {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].task_id === task_id) {
        tasks[i][`${key}`] = `${newValue}`;
      }
    }
    try {
      mutation.mutate({
        tasks: [...tasks],
      });
    } catch (err) {
      console.log(err);
    }
  };

  const toggleDone = () => {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].task_id === task_id) {
        tasks[i].done = !tasks[i].done;
      }
    }
    try {
      mutation.mutate({
        tasks: [...tasks],
      });
    } catch (err) {
      console.log(err);
    }
  };

  const changeDescription = async () => {
    if (description && description !== task.description) {
      updateTask("description", description);
    } else {
      setDescription(task.description);
    }
  };

  const changeTaskName = async () => {
    if (taskName && taskName !== task.title) {
      updateTask("title", taskName);
    } else {
      setTaskName(task.title);
    }
  };

  const changeTaskNameOnKeyPress = (e) => {
    if (e.key === "Enter") {
      e.target.blur();
      changeTaskName();
    }
  };

  const findUserName = (userID) => {
    console.log(collaborators.filter((person) => person.id === userID));
    return collaborators.filter((person) => person.id === userID)[0].name;
  };

  return (
    <SharedStyle.ParentContainer>
      <Collaborators collaborators={collaborators} />
      <SharedStyle.HeaderContainer>
        <SharedStyle.Header>
          <SharedStyle.GoBackButton onClick={() => navigate(-1)}>
            <img src={arrow} alt="go back" />
          </SharedStyle.GoBackButton>

          <SharedStyle.Name
            type="text"
            ref={inputRef}
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            onBlur={changeTaskName}
            onKeyPress={changeTaskNameOnKeyPress}
          ></SharedStyle.Name>
        </SharedStyle.Header>
      </SharedStyle.HeaderContainer>
      {task && (
        <S.TaskContainer>
          <div>
            Created: {getDateAndTime(task.created_at)} by{" "}
            {findUserName(task.addedBy)}
          </div>
          <div>
            <button onClick={toggleDone}>
              {task.done ? "Not done yet" : "Mark as done"}
            </button>
          </div>
          <div>Status: {task.done ? "done" : "in progress"}</div>
          <div>Assigned to: Elena, Sagva</div>
          <div>
            Description:
            <form onSubmit={handleSubmitDescriprion}>
              <AutoTextArea
                textAreaRef={textAreaRef}
                placeholder="Add description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onBlur={changeDescription}
              />
              <S.Button type="submit">Save</S.Button>
            </form>
          </div>
        </S.TaskContainer>
      )}
    </SharedStyle.ParentContainer>
  );
};

export default TaskPage;
