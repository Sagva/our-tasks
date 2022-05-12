import styled from "styled-components";
import colors from "../../theme/colors.json";

export const Wrapper = styled.div`
  background-color: #fff;
  margin: 0.5rem;
  padding: 0.5rem;
  border-radius: 7px;
  box-shadow: 0px 5px 13px -7px ${colors.primary_accent.color};

  &:hover {
    background-color: #e8dbbedd;
    cursor: pointer;
  }
`;
export const Title = styled.p`
  font-size: 1.1rem;
  padding-bottom: 0.3rem;
  margin-bottom: 0;
  border-bottom: 1px solid #c9c9ca6e;
`;
export const TextBox = styled.div`
  font-size: 0.8rem;
  color: #6c757c;
`;
export const Text = styled.p`
  margin-bottom: 0;
`;

export const Assignee = styled.span`
  width: fit-content;
  margin: 5px;
  padding: 3px 7px;
  border-radius: 15px;
  font-weight: 400;
  font-size: 12px;
  color: ${colors.primary_accent.onColor};
  background-color: ${colors.primary_accent.color};
`;
