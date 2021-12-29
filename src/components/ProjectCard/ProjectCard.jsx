import React from "react";
import * as S from "./style";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  const handleClick = (project) => {
    console.log(`the project was clicked`, project.name);
    navigate(`/project/${project.id}`);
  };
  return <S.Card onClick={() => handleClick(project)}>{project.name}</S.Card>;
};

export default ProjectCard;
