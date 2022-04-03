import React from "react";
import * as S from "./style";

const TaskPreviewCard = ({ task }) => {
  const createdDate = new Date(task.created_at)
    .toLocaleDateString("en-GB")
    .split("/")
    .reverse()
    .join("-");
  const createdTime = new Date(task.created_at).toLocaleTimeString("en-GB");

  return (
    <S.Wrapper>
      <S.Title>{task.title}</S.Title>
      <S.Created>
        <p>
          Created:
          <span>
            {createdDate} {createdTime}
          </span>
        </p>
      </S.Created>
    </S.Wrapper>
  );
};

export default TaskPreviewCard;
