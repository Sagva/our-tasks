import React, { useEffect, useRef, useState } from "react";
import Collaborators from "../../components/Collaborators/Collaborators";
import * as S from "./style";
import * as SharedStyle from "../ProjectPage/style";
import arrow from "../../assets/svg/arrow.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useProjectContext } from "../../contexts/ProjectContext";
import { getDateAndTime } from "../../components/utils/utils";
import { doc, query } from "firebase/firestore";
import {
  useFirestoreDocument,
  useFirestoreDocumentMutation,
} from "@react-query-firebase/firestore";
import { db } from "../../firebase";
import TaskDescription from "../../components/TaskDescription";
import TaskAssignee from "../../components/TaskAssignee";
import { v4 as uuidv4 } from "uuid";
import { useAuthContext } from "../../contexts/AuthContext";
import { useQueryClient } from "react-query";
import TaskComments from "../../components/TaskComments";

const TaskPage = () => {
  const { project_id, task_id } = useParams();
  const { collaborators, getCollaborators, hasPermission } =
    useProjectContext();
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();
  const inputRef = useRef();
  const textAreaRefDescription = useRef(null);
  const textAreaRefComment = useRef(null);

  const queryClient = useQueryClient();
  const ref = doc(db, "projects", project_id);
  const queryRef = query(ref);
  const project = useFirestoreDocument(
    ["project", project_id],
    queryRef,
    {
      idField: "id",
      subscribe: true,
    },
    {
      refetchOnMount: "always",
    }
  );
  const snapshot = project.data;

  const [taskName, setTaskName] = useState("");
  const [task, setTask] = useState();
  const [tasks, setTasks] = useState("");
  const [description, setDescription] = useState("");
  const [comments, setComments] = useState("");
  const [comment, setComment] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [assigneeOptions, setAssigneeOptions] = useState([]);
  const [showAddAssigneeForm, setShowAddAssigneeForm] = useState(false);
  const mutation = useFirestoreDocumentMutation(ref, {
    merge: true,
    onSuccess: () => {
      queryClient.invalidateQueries("project");
    },
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
    if (snapshot) {
      let currentTask = getCurrentTask(snapshot.data().tasks, task_id);
      getCollaborators(snapshot.data().accessList);
      setTask(currentTask);
      setTasks(snapshot.data().tasks);
      setTaskName(currentTask.title);
      setDescription(currentTask.description);
      setAssignedUsers(currentTask.assignee);
      getAssigneeOptions(currentTask);
      setComments(currentTask.comments);
    }
  }, [snapshot]);

  const handleSubmitDescriprion = async (e) => {
    e.preventDefault();
    updateTask("description", textAreaRefDescription.current.value);
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

  const handleDeleteAssignee = (assigneeId) => {
    const newTaskAssignee = task.assignee.filter(
      (user) => user.id !== assigneeId
    );
    updateTask("assignee", newTaskAssignee);
    const currentTask = getCurrentTask(tasks, task_id);
    getAssigneeOptions(currentTask);
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!textAreaRefComment.current.value) {
      return;
    }
    const commentToAdd = {
      author: { id: currentUser.uid, name: currentUser.displayName },
      content: textAreaRefComment.current.value,
      id: uuidv4(),
      createdAt: Date.now(),
    };
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].task_id === task_id) {
        tasks[i][`comments`].push(commentToAdd);
      }
    }
    try {
      mutation.mutate({
        tasks: [...tasks],
      });
    } catch (err) {
      console.log(err);
    }
    setComment("");
  };

  let content = "";
  if (hasPermission) {
    content = (
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
            <div className="d-flex flex-column flex-sm-row">
              <span className="pe-2 fw-bold">Created:</span>
              <span className="pe-2">{getDateAndTime(task.created_at)}</span>

              <span className="pe-2 fw-bold flex-grow-1">
                by {task.addedBy.name}
              </span>
              <S.Button onClick={toggleDone} style={{ width: 130 }}>
                {task.done ? "Back in progress" : "Mark as done"}
              </S.Button>
            </div>
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
              textAreaRef={textAreaRefDescription}
            />
            <TaskComments
              comments={comments}
              comment={comment}
              setComment={setComment}
              handleSubmitComment={handleSubmitComment}
              textAreaRefComment={textAreaRefComment}
            />
          </S.TaskContainer>
        )}
      </SharedStyle.ParentContainer>
    );
  } else {
    content = (
      <div className="container flex justify-content-center">
        You don't have permission to view that page. View or create your
        projects <Link to="/projects">here</Link>
      </div>
    );
  }

  return <div>{content}</div>;
};

export default TaskPage;
