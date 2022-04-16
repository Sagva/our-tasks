import React from "react";
import * as S from "./style";
import { getDateAndTime } from "../utils/utils";

const TaskPreviewCard = ({ task }) => {
  return (
    <S.Wrapper>
      <S.Title>{task.title}</S.Title>
      <S.Created>
        <p>
          Created:
          <span> {getDateAndTime(task.created_at)}</span>
        </p>
      </S.Created>
    </S.Wrapper>
  );
};

export default TaskPreviewCard;
