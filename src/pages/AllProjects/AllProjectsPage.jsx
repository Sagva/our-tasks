import React, { useEffect } from "react";
import * as S from "./style";
import plus from "../../assets/svg/plus.svg";
import { Container } from "react-bootstrap";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import useProjects from "../../hooks/useProjects";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const AllProjectsPage = () => {
  const { currentUser } = useAuthContext();
  const projectQuery = useProjects(currentUser.uid);

  const navigate = useNavigate();

  const handleClick = async () => {
    const projectData = await addDoc(collection(db, "projects"), {
      name: "New project",
      accessList: [currentUser.uid],
    });

    
    navigate(`/project/${projectData.id}`);
  };

  return (
    <Container>
      <S.ProjectsHeader>
        <S.ButtonOutline onClick={handleClick}>
          <div className="d-flex">
            <img src={plus} alt="add project" />
            <span className="mx-2"> New project</span>
          </div>
        </S.ButtonOutline>
        <div style={{ margin: "0 auto" }}>
          <S.Heading>Your projects</S.Heading>
        </div>
      </S.ProjectsHeader>
      <div className="d-flex flex-column flex-md-row mt-4 flex-wrap">
        {projectQuery.isLoading && <p>Loading...</p>}
        {projectQuery.data && (
          <>
            {projectQuery.data.length ? (
              <>
                {projectQuery.data.map((project) => {
                  return <ProjectCard project={project} key={project.id} />;
                })}
              </>
            ) : (
              <p>You don't have any projects for the moment</p>
            )}
          </>
        )}
      </div>
    </Container>
  );
};

export default AllProjectsPage;
