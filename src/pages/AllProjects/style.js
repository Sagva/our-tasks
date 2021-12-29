import styled from "styled-components";
import colors from "../../theme/colors.json";

export const Button = styled.button`
  text-transform: uppercase;
  padding: 0.7rem 1.2rem;
  display: inline-block;
  border-radius: 0.5rem;
  font-size: 0.7rem;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
  margin: 0.5rem 0;
  min-width: 6.5rem;
`;

export const ButtonOutline = styled(Button)`
  border: 1px solid ${colors.accent.color};
  color: ${colors.accent.color};
  background-color: ${colors.accent.onColor};

  &:hover {
    background-color: ${colors.accent.color};
    color: ${colors.accent.onColor};
    border-color: ${colors.accent_dark.color};
  }
`;

export const ProjectsHeader = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  border-bottom: 1px solid ${colors.background.color};

  @media (min-width: 500px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;
export const Heading = styled.h1`
  font-size: 1.5rem;
  @media (min-width: 500px) {
    flex-grow: 1;
  }
`;
