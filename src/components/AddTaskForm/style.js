import styled from "styled-components";
import colors from "../../theme/colors.json";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  margin: 1rem 0.7rem;
`;
export const Input = styled.input`
  border-radius: 7px;
`;
export const Textarea = styled.textarea`
  background-color: #fff;
  padding: 0.5rem;
  border-radius: 7px;
  box-shadow: 0px 5px 13px -7px ${colors.primary_accent.color};
  width: 100%;
  overflow: hidden;
  resize: none;
  border: none;

  &::placeholder {
    color: ${colors.light_gray.color};
  }

  &:focus {
    outline: none !important;
    box-shadow: 0 0 10px #719ece;
  }
`;
export const ButtonContainer = styled.div`
  text-align: center;
`;
