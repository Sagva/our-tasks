import React from "react";
import TaskPreviewCard from "../TaskPreviewCard/TaskPreviewCard";
import * as S from "./style";

const TaskContainer = ({ title, taskList, AddTaskForm, filter }) => {
  // console.log(`AddTaskForm`, AddTaskForm);
  return (
    <S.Wrapper>
      <S.Header>{title}</S.Header>
      {filter && filter}
      {taskList &&
        taskList.map((task, index) => {
          return (
            <div key={`${task}-${index}`}>
              <TaskPreviewCard task={task} />
            </div>
          );
        })}

      {AddTaskForm && <AddTaskForm />}
    </S.Wrapper>
  );
};

export default TaskContainer;
