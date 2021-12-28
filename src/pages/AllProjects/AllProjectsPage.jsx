import React, { useEffect } from "react";
import * as S from "./style";
import plus from "../../assets/svg/plus.svg";
import { Container } from "react-bootstrap";
import ProjectCard from "../../components/ProjectCard/ProjectCard";

const AllProjectsPage = () => {
  const projects = [{ name: "Examensarbete" }, { name: "Bil shop Lavander" }];
  return (
    <Container>
      <S.ProjectsHeader>
        <S.ButtonOutline>
          <div className="d-flex">
            <img src={plus} alt="add project" />
            <span className="mx-2"> New project</span>
          </div>
        </S.ButtonOutline>
        <div style={{ margin: "0 auto" }}>
          <S.Heading>Your projects</S.Heading>
        </div>
      </S.ProjectsHeader>
      <div className="d-flex flex-column flex-md-row mt-4">
        {projects &&
          projects.map((project) => {
            return <ProjectCard project={project} key={project.name} />;
          })}

        {!projects && <p>You don't have any projects for the moment</p>}
      </div>
    </Container>
  );
};

export default AllProjectsPage;
