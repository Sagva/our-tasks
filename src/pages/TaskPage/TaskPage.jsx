import React, { useRef, useState } from "react";
import Collaborators from "../../components/Collaborators/Collaborators";
import * as S from "./style";
import * as SharedStyle from "../ProjectPage/style";

import arrow from "../../assets/svg/arrow.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useProjectContext } from "../../contexts/ProjectContext";
import { getDateAndTime } from "../../components/utils/utils";
import AutoTextArea from "../../components/AddTaskForm/AutoTextArea";

const TaskPage = () => {
  const { project_id, task_id } = useParams();
  console.log(`task_id`, task_id);
  console.log(`project_id`, project_id);
  const navigate = useNavigate();
  const { collaborators } = useProjectContext();
  const inputRef = useRef();
  const textAreaRef = useRef(null);
  let task = {
    task_id: "ba9a534a-9740-4f05-8e0c-f10713660b42",
    title: "fix important thing",
    description: "",
    comments: [],
    assignee: [],
    addedBy: "ba9a534a-9740-4f05-8e0c-f10713660b42",
    created_at: Date.now(),
    done: false,
  };

  const [taskName, setTaskName] = useState(task.title);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(`textAreaRef.current.value`, textAreaRef.current.value);
  };
  return (
    <SharedStyle.ParentContainer>
      <Collaborators collaborators={collaborators} />
      <SharedStyle.HeaderContainer>
        <SharedStyle.Header>
          <SharedStyle.GoBackButton onClick={() => navigate(-1)}>
            <img src={arrow} alt="go back" />
          </SharedStyle.GoBackButton>

          <SharedStyle.Name
            type="text"
            ref={inputRef}
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            // onBlur={changeProjectName}
            // onKeyPress={handleKeyPress}
          ></SharedStyle.Name>
        </SharedStyle.Header>
      </SharedStyle.HeaderContainer>
      <S.TaskContainer>
        <div>Created: {getDateAndTime(task.created_at)} by Elena</div>
        <div>Assigned to: Elena, Sagva</div>
        <div>
          Description:
          <form onSubmit={handleSubmit}>
            <AutoTextArea
              textAreaRef={textAreaRef}
              placeholder="Add description"
            />
            <S.Button type="submit">Save</S.Button>
          </form>
        </div>
      </S.TaskContainer>
    </SharedStyle.ParentContainer>
  );
};

export default TaskPage;
