import React from "react";
import * as S from "./style";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  const handleClick = (project) => {
    navigate(`${process.env.PUBLIC_URL}/project/${project.id}`, {
      state: { isClicked: true },
    });
  };
  return <S.Card onClick={() => handleClick(project)}>{project.name}</S.Card>;
};

export default ProjectCard;
