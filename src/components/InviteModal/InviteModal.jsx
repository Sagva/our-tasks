import React, { useRef } from "react";
import * as S from "./style";
import * as SharedStyle from "../../pages/AllProjects/style";
import close from "../../assets/svg/close.svg";
import useOnClickOutside from "../../hooks/useOnCllickOutside";
const InviteModal = (props) => {
  const { showModal, setShowModal } = props;
  const inviteContainerRef = useRef();

  useOnClickOutside(inviteContainerRef, () => setShowModal(false));

  return (
    <S.InviteContainer
      ref={inviteContainerRef}
      style={{ display: showModal ? "block" : "none" }}
    >
      <S.InviteHeading>
        <h6>Invite to project</h6>
        <S.CloseIcon onClick={() => setShowModal(false)}>
          <S.Img src={close} alt="close modal window" />
        </S.CloseIcon>
      </S.InviteHeading>
      <S.Input type="email" required placeholder="Enter email address" />
      <S.Message>User should be registered at OurTasks</S.Message>
      <SharedStyle.ButtonOutline>
        <span className="mx-2">Invite</span>
      </SharedStyle.ButtonOutline>
    </S.InviteContainer>
  );
};

export default InviteModal;
