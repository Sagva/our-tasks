import React, { useRef } from "react";
import AutoTextArea from "./AutoTextArea";
import * as S from "./style";
import * as ShS from "../../sharedStyle";

const AddTaskForm = () => {
  const textAreaRef = useRef(null);

  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    console.log("textAreaRef.current.value", textAreaRef.current.value);
  };
  return (
    <S.Form onSubmit={handleSubmit}>
      <AutoTextArea textAreaRef={textAreaRef} />
      <S.ButtonContainer>
        <ShS.ButtonSolid type="submit">Add task</ShS.ButtonSolid>
      </S.ButtonContainer>
    </S.Form>
  );
};

export default AddTaskForm;
