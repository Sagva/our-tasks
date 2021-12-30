import styled from "styled-components";
import colors from "../../theme/colors.json";

export const InviteContainer = styled.div`
  width: 15rem;
  height: 15rem;
  border-radius: 5px;
  background-color: ${colors.background_variant.color};
  text-align: center;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  position: absolute;
  top: 121px;
  left: 22px;
`;
export const InviteHeading = styled.div`
  border-bottom: 1px solid ${colors.secondary_accent.color};
  width: 120px;
  margin: 0 auto;
  padding-top: 1rem;
  position: relative;
`;
export const Input = styled.input`
  width: 95%;
  margin-top: 25px;
  padding: 5px;
  border-radius: 3px;
  border: 1px solid ${colors.light_gray.color};
  &::placeholder {
    color: ${colors.light_gray.color};
  }

  &:focus {
    outline-color: ${colors.accent.color};
  }
`;
export const Message = styled.p`
  font-size: 13.5px;
  color: ${colors.primary_accent.color};
  margin: 5px 0 25px 0;
`;
export const CloseIcon = styled.button`
  position: absolute;
  top: -2px;
  right: -60px;
  border: none;
  background: none;
`;
export const Img = styled.img`
  border-radius: 50%;
  padding: 2px;
  &:hover {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  }
`;
