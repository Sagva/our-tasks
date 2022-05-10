import React from "react";
import AutoTextArea from "./AddTaskForm/AutoTextArea";
import * as S from "../pages/TaskPage/style";
import { getDateAndTime } from "./utils/utils";
import { useAuthContext } from "../contexts/AuthContext";

const TaskComments = ({
  comments,
  comment,
  setComment,
  handleSubmitComment,
  textAreaRefComment,
}) => {
  const { currentUser } = useAuthContext();
  return (
    <div>
      <b>Comments:</b>
      <S.CommentList>
        {comments.map((comment) => (
          <li key={comment.id}>
            <S.Author currentUser={currentUser.uid === comment.author.id}>
              {comment.author.name}
            </S.Author>
            <S.Time>{getDateAndTime(comment.createdAt)}</S.Time>

            <S.Comment>{comment.content}</S.Comment>
          </li>
        ))}
      </S.CommentList>

      <form onSubmit={handleSubmitComment}>
        <AutoTextArea
          textAreaRef={textAreaRefComment}
          placeholder="add comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <S.Button type="submit">Save</S.Button>
      </form>
    </div>
  );
};

export default TaskComments;
