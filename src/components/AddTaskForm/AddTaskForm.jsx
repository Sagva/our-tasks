import React, { useRef } from "react";
import AutoTextArea from "./AutoTextArea";
import * as S from "./style";
import * as ShS from "../../sharedStyle";

const AddTaskForm = ({ submitHandler }) => {
  const textAreaRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    submitHandler(textAreaRef.current.value);

    textAreaRef.current.value = "";
  };
  return (
    <S.Form onSubmit={handleSubmit}>
      <AutoTextArea
        textAreaRef={textAreaRef}
        placeholder="Enter a title for a new task"
      />
      <S.ButtonContainer>
        <ShS.ButtonSolid type="submit">Add task</ShS.ButtonSolid>
      </S.ButtonContainer>
    </S.Form>
  );
};

export default AddTaskForm;
