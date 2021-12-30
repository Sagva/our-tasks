import React, { useRef, useState } from "react";
import * as S from "./style";
import * as SharedStyle from "../../pages/AllProjects/style";
import plus from "../../assets/svg/plus.svg";
import InviteModal from "../InviteModal/InviteModal";
const Collaborators = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <S.Collaborators>
      <InviteModal showModal={showModal} setShowModal={setShowModal} />
      <S.Heading>Collaborators</S.Heading>

      <div>
        <S.BtnContainer>
          <SharedStyle.ButtonOutline onClick={() => setShowModal(true)}>
            <div className="d-flex">
              <img src={plus} alt="add project" />
              <span className="mx-2"> Invite</span>
            </div>
          </SharedStyle.ButtonOutline>
        </S.BtnContainer>
        <S.Names>
          <p>Elena</p>
          <p>Beta</p>
          <p>Kyd</p>
          <p>Katya</p>
          <p>Doo</p>
        </S.Names>
      </div>
    </S.Collaborators>
  );
};

export default Collaborators;
