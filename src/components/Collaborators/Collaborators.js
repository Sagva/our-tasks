import React from "react";
import * as S from "./style";
import * as SharedStyle from "../../pages/AllProjects/style";
import plus from "../../assets/svg/plus.svg";

const Collaborators = () => {
  return (
    <S.Collaborators>
      <S.Heading>Collaborators</S.Heading>
      <div>
        <S.BtnContainer>
          <SharedStyle.ButtonOutline>
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
