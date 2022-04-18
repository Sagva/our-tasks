import React from "react";
import * as S from "./style";
import { getDateAndTime } from "../utils/utils";

const TaskPreviewCard = ({ task }) => {
  return (
    <S.Wrapper>
      <S.Title>{task.title}</S.Title>
      <S.TextBox>
        <S.Text>
          Created:
          <span> {getDateAndTime(task.created_at)}</span>
        </S.Text>
      </S.TextBox>
    </S.Wrapper>
  );
};

export default TaskPreviewCard;
