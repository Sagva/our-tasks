import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useFirestoreDocument } from "@react-query-firebase/firestore";
import { doc, query, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import arrow from "../../assets/svg/arrow.svg";
import * as S from "./style";
import Collaborators from "../../components/Collaborators/Collaborators";
import { useProjectContext } from "../../contexts/ProjectContext";
import TaskContainer from "../../components/TaskContainer/TaskContainer";
import AddTaskForm from "../../components/AddTaskForm/AddTaskForm";

const ProjectPage = () => {
  const { id } = useParams();
  const { state } = useLocation(); //to make input in focus only if user redirects first time
  const navigate = useNavigate();

  const { setProjectId, collaborators, getCollaborators } = useProjectContext();

  //set project Id in the Context for using it at other components
  useEffect(() => {
    setProjectId(id);
  }, [setProjectId, id]);

  //to rename project
  const inputRef = useRef();
  const [projectName, setProjectName] = useState("");
  const [fetchedProject, setFetchedProject] = useState(null);

  // to get the data about project from db
  const ref = doc(db, "projects", id);
  const queryRef = query(ref);

  const project = useFirestoreDocument(
    ["project", id],
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

  //as soon as the project's data is gotten, setProjectName as it is in DB and get collaborators
  useEffect(() => {
    if (snapshot) {
      getCollaborators(snapshot.data().accessList);
      setProjectName(snapshot.data().name);
      setFetchedProject(snapshot.data());
    }
  }, [snapshot]);

  //to change project name either on enter click or onBlur on input
  const changeProjectName = async () => {
    if (projectName && projectName !== snapshot.data().name) {
      await updateDoc(ref, {
        name: projectName,
      });
    } else {
      setProjectName(snapshot.data().name);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.target.blur();
      changeProjectName();
    }
  };

  return (
    <S.ParentContainer>
      <Collaborators collaborators={collaborators} />
      <S.HeaderContainer>
        <S.ProjectHeader>
          <S.GoBackButton onClick={() => navigate(-1)}>
            <img src={arrow} alt="go back" />
          </S.GoBackButton>
          {project.isLoading && <p>Loading...</p>}

          {snapshot && (
            <S.ProjectName
              type="text"
              ref={inputRef}
              autoFocus={!state}
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              onBlur={changeProjectName}
              onKeyPress={handleKeyPress}
            ></S.ProjectName>
          )}
        </S.ProjectHeader>
      </S.HeaderContainer>

      <S.TaskSection>
        <TaskContainer
          title="Todo"
          taskList={fetchedProject?.tasks}
          AddTaskForm={AddTaskForm}
          project={fetchedProject}
          id={id}
        />
        <TaskContainer
          title="Ongoing"
          taskList={fetchedProject?.tasks.filter(
            (task) => task.assignee.length > 0 && !task.done
          )}
          project={fetchedProject}
          id={id}
        />
        <TaskContainer
          title="Done"
          taskList={fetchedProject?.tasks.filter((task) => task.done)}
          project={fetchedProject}
          id={id}
        />
      </S.TaskSection>
    </S.ParentContainer>
  );
};

export default ProjectPage;
