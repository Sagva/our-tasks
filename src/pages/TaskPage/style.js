import styled from "styled-components";
import colors from "../../theme/colors.json";

export const TaskContainer = styled.div`
  width: fit-content;
  background-color: ${colors.background.color};
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  overflow-y: scroll;
  height: 70vh;
  margin: 2rem auto;

  @media (min-width: 1150px) {
    width: 50%;
  }
`;

export const Button = styled.button`
  text-transform: uppercase;
  display: inline-block;
  border-radius: 0.5rem;
  font-size: 0.7rem;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
  padding: 0.5rem 0.9rem;
  margin: 0.5rem 0;
  box-shadow: 0px 5px 13px -7px ${colors.primary_accent.color};
  background-color: ${colors.background_variant.color};

  &:hover {
    background-color: ${colors.secondary_accent.color};
  }
`;
export const DeleteBtn = styled.button`
  border: none;
  background: none;
  padding-left: 3px;
`;
export const Img = styled.img`
  border-radius: 50%;
  padding: 2px;
  &:hover {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  }
`;

export const Assignee = styled.div`
  padding: 0.5rem 0;
  margin: 0.5rem 0;
  display: flex;
`;
