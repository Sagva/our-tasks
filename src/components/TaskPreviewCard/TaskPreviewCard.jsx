import React from "react";
import * as S from "./style";
import { getDateAndTime } from "../utils/utils";

const TaskPreviewCard = ({ task }) => {
  return (
    <S.Wrapper>
      <div>
        <S.Title className="d-flex">
          <span className="flex-grow-1">{task.title}</span>

          {task.assignee && task.assignee.length > 0 && (
            <span>
              {task.assignee.map((item, index) => (
                <S.Assignee className="me-1" key={`${item.assignee}-${index}`}>
                  {item.name}
                </S.Assignee>
              ))}
            </span>
          )}
        </S.Title>
      </div>

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
