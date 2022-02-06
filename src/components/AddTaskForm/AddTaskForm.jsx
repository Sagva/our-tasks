import React, { useRef } from "react";
import AutoTextArea from "./AutoTextArea";
import * as S from "./style";
import * as ShS from "../../sharedStyle";

const AddTaskForm = () => {
  const inputRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputRef.current.value);
  };
  return (
    <S.Form onSubmit={handleSubmit}>
      {/* <S.Input
        type="text"
        placeholder="Enter a title for this task"
        ref={inputRef}
      /> */}
      <AutoTextArea />
      <S.ButtonContainer>
        <ShS.ButtonSolid type="submit">Add task</ShS.ButtonSolid>
      </S.ButtonContainer>
    </S.Form>
  );
};

export default AddTaskForm;
