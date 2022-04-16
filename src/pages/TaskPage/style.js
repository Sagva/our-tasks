import styled from "styled-components";
import colors from "../../theme/colors.json";

export const TaskContainer = styled.div`
  width: fit-content;
  background-color: ${colors.background.color};
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
`;
export const Button = styled.button`
  text-transform: uppercase;
  padding: 0.5rem 0.9rem;
  display: inline-block;
  border-radius: 0.5rem;
  font-size: 0.7rem;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
  margin: 0.5rem 0;
  box-shadow: 0px 5px 13px -7px ${colors.primary_accent.color};
  background-color: ${colors.background_variant.color};

  &:hover {
    background-color: ${colors.secondary_accent.color};
  }
`;
