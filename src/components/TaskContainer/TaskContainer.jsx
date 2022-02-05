import React from "react";
import TaskPreviewCard from "../TaskPreviewCard/TaskPreviewCard";
import * as S from "./style";

const TaskContainer = ({ title, taskList, inputTaskForm, filter }) => {
  return (
    <S.Wrapper>
      <S.Header>{title}</S.Header>
      {filter && filter}
      {taskList &&
        taskList.map((task, index) => {
          return (
            <p key={`${task}-${index}`}>
              <TaskPreviewCard task={task} />
            </p>
          );
        })}

      {inputTaskForm && inputTaskForm}
    </S.Wrapper>
  );
};

export default TaskContainer;
