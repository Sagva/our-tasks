import React from "react";
import * as S from "./style";

const TaskPreviewCard = ({ task }) => {
  return (
    <S.Wrapper>
      <S.Title>{task.title}</S.Title>
      <S.Created>
        <p>
          Created: <span>{task.created}</span>
        </p>
      </S.Created>
    </S.Wrapper>
  );
};

export default TaskPreviewCard;
