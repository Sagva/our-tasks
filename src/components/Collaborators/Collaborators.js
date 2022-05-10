import React, { useState } from "react";
import * as S from "./style";
import * as SharedStyle from "../../pages/AllProjects/style";
import plus from "../../assets/svg/plus.svg";
import InviteModal from "../InviteModal/InviteModal";
import { useAuthContext } from "../../contexts/AuthContext";
import { useParams } from "react-router-dom";
const Collaborators = ({ collaborators }) => {
  const [showModal, setShowModal] = useState(false);
  const { currentUser } = useAuthContext();

  let { id } = useParams();

  return (
    <S.Collaborators>
      <InviteModal showModal={showModal} setShowModal={setShowModal} />
      <h5>Collaborators</h5>

      <div>
        <S.BtnContainer>
          {id && (
            <SharedStyle.ButtonOutline onClick={() => setShowModal(true)}>
              <div className="d-flex">
                <img src={plus} alt="add project" />
                <span className="mx-2"> Invite</span>
              </div>
            </SharedStyle.ButtonOutline>
          )}
        </S.BtnContainer>
        <S.Names>
          {collaborators &&
            collaborators
              .sort((a, b) => {
                if (a.id === currentUser.uid) {
                  return -1;
                } else if (b.id === currentUser.uid) {
                  return 1;
                } else return a - b;
              })
              .map((element) => {
                return (
                  <S.Paragraph
                    key={element.email}
                    currentUser={currentUser.uid === element.id}
                  >
                    {element.name}
                  </S.Paragraph>
                );
              })}
        </S.Names>
      </div>
    </S.Collaborators>
  );
};

export default Collaborators;
