import React from "react";
import * as S from "./style";

const ProjectCard = ({ project }) => {
  const handleClick = (project) => {
    console.log(`the project was clicked`, project.name);
  };
  return <S.Card onClick={() => handleClick(project)}>{project.name}</S.Card>;
};

export default ProjectCard;
