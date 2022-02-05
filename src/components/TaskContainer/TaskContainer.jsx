import React from "react";
import * as S from "./style";

const TaskContainer = ({ title, taskList, inputTaskForm, filter }) => {
  return (
    <S.Wrapper>
      <S.Header>{title}</S.Header>
      {filter && filter}
      {taskList &&
        taskList.map((task, index) => {
          return <p key={`${task}-${index}`}>{task}</p>;
        })}

      {inputTaskForm && inputTaskForm}
    </S.Wrapper>
  );
};

export default TaskContainer;
