import React, { useRef, useState } from "react";
import * as S from "./style";
import close from "../../assets/svg/close.svg";
import useOnClickOutside from "../../hooks/useOnCllickOutside";
import Alert from "react-bootstrap/Alert";
import { useProjectContext } from "../../contexts/ProjectContext";

const InviteModal = (props) => {
  const { showModal, setShowModal } = props;
  const [message, setMessage] = useState();
  const [email, setEmail] = useState("");
  const inviteContainerRef = useRef();

  const {inviteCollaborators} = useProjectContext()

  //close Invite modal window on click outside it
  useOnClickOutside(inviteContainerRef, () => handleClose());

  //update access list on project document

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await inviteCollaborators(email);
    setEmail("");
    setMessage(result);
    // setShowModal(false);
  };

  const handleClose = () => {
    setMessage("");
    setShowModal(false);
  };

  return (
    <S.InviteContainer
      ref={inviteContainerRef}
      style={{ display: showModal ? "block" : "none" }}
    >
      <S.InviteHeading>
        <h6>Invite to project</h6>
        <S.CloseIcon onClick={handleClose}>
          <S.Img src={close} alt="close modal window" />
        </S.CloseIcon>
      </S.InviteHeading>
      <form onSubmit={handleSubmit}>
        <div>
          <S.Input
            type="email"
            required
            placeholder="Enter user's email address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <S.Message>Email must be registered at OurTasks</S.Message>
          {message && <Alert variant={message.type}>{message.text}</Alert>}
        </div>
        <S.Button type="submit">invite</S.Button>
      </form>
    </S.InviteContainer>
  );
};

export default InviteModal;
