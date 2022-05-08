import React, { useEffect, useRef, useState } from "react";
import Collaborators from "../../components/Collaborators/Collaborators";
import * as S from "./style";
import * as SharedStyle from "../ProjectPage/style";
import arrow from "../../assets/svg/arrow.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useProjectContext } from "../../contexts/ProjectContext";
import { getDateAndTime } from "../../components/utils/utils";
import { doc } from "firebase/firestore";
import { useFirestoreDocumentMutation } from "@react-query-firebase/firestore";
import { db } from "../../firebase";
import TaskDescription from "../../components/TaskDescription";
import TaskAssignee from "../../components/TaskAssignee";

const TaskPage = () => {
  const { project_id, task_id } = useParams();
  const { collaborators, tasks } = useProjectContext();
  const navigate = useNavigate();

  const inputRef = useRef();
  const textAreaRef = useRef(null);

  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [task, setTask] = useState();
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [assigneeOptions, setAssigneeOptions] = useState([]);
  const [showAddAssigneeForm, setShowAddAssigneeForm] = useState(false);

  const ref = doc(db, "projects", project_id);
  const mutation = useFirestoreDocumentMutation(ref, {
    merge: true,
  });

  const getAssigneeOptions = (currentTask) => {
    let assigneeOptions = [];
    for (let i = 0; i < collaborators.length; i++) {
      let found = false;
      for (let j = 0; j < currentTask.assignee.length; j++) {
        if (collaborators[i].id === currentTask.assignee[j].id) {
          found = true;
        }
      }

      if (!found) {
        assigneeOptions.push({
          value: collaborators[i],
          label: collaborators[i].name,
        });
      }
    }
    setAssigneeOptions(assigneeOptions);
  };

  const getCurrentTask = (tasks, currentTaskId) => {
    return tasks.filter((t) => t.task_id === currentTaskId)[0];
  };

  useEffect(() => {
    if (tasks && collaborators) {
      let currentTask = getCurrentTask(tasks, task_id);

      setTask(currentTask);
      setTaskName(currentTask.title);
      setDescription(currentTask.description);
      setAssignedUsers(currentTask.assignee);
      getAssigneeOptions(currentTask);
    }
  }, [tasks, collaborators]);

  const handleSubmitDescriprion = async (e) => {
    e.preventDefault();
    updateTask("description", textAreaRef.current.value);
  };

  const updateTask = (key, newValue) => {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].task_id === task_id) {
        tasks[i][`${key}`] = newValue;
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
    if (description !== task.description) {
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

  const handleAddAssignee = (e) => {
    e.preventDefault();
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].task_id === task_id) {
        for (let j = 0; j < assignedUsers.length; j++) {
          if (assignedUsers[j].value) {
            tasks[i].assignee.push(assignedUsers[j].value);
          }
        }
      }
    }
    try {
      mutation.mutate({
        tasks: [...tasks],
      });
    } catch (err) {
      console.log(err);
    }

    const currentTask = getCurrentTask(tasks, task_id);
    getAssigneeOptions(currentTask);
    setShowAddAssigneeForm(false);
  };
  const findUserName = (userID) => {
    return collaborators.filter((person) => person.id === userID)[0].name;
  };

  const handleDeleteAssignee = (assigneeId) => {
    const newTaskAssignee = task.assignee.filter(
      (user) => user.id !== assigneeId
    );
    updateTask("assignee", newTaskAssignee);
    const currentTask = getCurrentTask(tasks, task_id);
    getAssigneeOptions(currentTask);
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
            <b>Created:</b> {getDateAndTime(task.created_at)} <b>by </b>
            {findUserName(task.addedBy)}{" "}
            <S.Button onClick={toggleDone} style={{ width: 130 }}>
              {task.done ? "Back in progress" : "Mark as done"}
            </S.Button>
          </div>
          <div></div>
          <div>
            <b>Status:</b> {task.done ? "Done" : "In progress"}
          </div>

          <TaskAssignee
            task={task}
            handleDeleteAssignee={handleDeleteAssignee}
            assigneeOptions={assigneeOptions}
            setShowAddAssigneeForm={setShowAddAssigneeForm}
            showAddAssigneeForm={showAddAssigneeForm}
            handleAddAssignee={handleAddAssignee}
            setAssignedUsers={setAssignedUsers}
          />
          <TaskDescription
            handleSubmitDescriprion={handleSubmitDescriprion}
            placeholder="Add description"
            description={description}
            setDescription={setDescription}
            changeDescription={changeDescription}
            textAreaRef={textAreaRef}
          />
        </S.TaskContainer>
      )}
    </SharedStyle.ParentContainer>
  );
};

export default TaskPage;
