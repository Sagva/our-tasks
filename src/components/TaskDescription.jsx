import React from "react";
import AutoTextArea from "./AddTaskForm/AutoTextArea";
import * as S from "../pages/TaskPage/style";

const TaskDescription = ({
  handleSubmitDescriprion,
  placeholder,
  description,
  setDescription,
  changeDescription,
  textAreaRef,
}) => {
  return (
    <div>
      <b>Description:</b>
      <form onSubmit={handleSubmitDescriprion}>
        <AutoTextArea
          textAreaRef={textAreaRef}
          placeholder={placeholder}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={changeDescription}
        />
        <S.Button type="submit">Save</S.Button>
      </form>
    </div>
  );
};

export default TaskDescription;
