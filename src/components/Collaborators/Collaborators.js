import React, { useState } from "react";
import * as S from "./style";
import * as SharedStyle from "../../pages/AllProjects/style";
import plus from "../../assets/svg/plus.svg";
import InviteModal from "../InviteModal/InviteModal";
const Collaborators = ({ invite, collaborators }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <S.Collaborators>
      <InviteModal showModal={showModal} setShowModal={setShowModal} />
      <h5>Collaborators</h5>

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
          {collaborators &&
            collaborators.map((element) => {
              return <p key={element.email}>{element.name}</p>;
            })}
        </S.Names>
      </div>
    </S.Collaborators>
  );
};

export default Collaborators;
