import styled from "styled-components";
import colors from "../../theme/colors.json";

export const Button = styled.button`
  text-transform: uppercase;
  padding: 0.7rem 1.5rem;
  display: inline-block;
  border-radius: 0.5rem;
  font-size: 0.7rem;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
  margin: 0.5rem;
  width: 6.5rem;
`;

export const ButtonOutline = styled(Button)`
  border: 1px solid ${colors.accent.color};
  color: ${colors.accent.color};
  background-color: ${colors.accent.onColor};

  &:hover {
    background-color: ${colors.accent_dark.color};
    color: ${colors.accent.onColor};
    border-color: ${colors.accent_dark.color};
  }
`;

export const ButtonSolid = styled(Button)`
  background-color: ${colors.accent.color};
  color: ${colors.accent.onColor};

  & a {
    text-decoration: none;
    color: ${colors.accent.onColor};
  }

  &:hover {
    background-color: ${colors.accent_dark.color};
  }
`;
