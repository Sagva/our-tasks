import styled from "styled-components";
import colors from "../../theme/colors.json";

export const Card = styled.div`
  font-size: 1.2rem;
  color: ${colors.background.onColor};
  width: 13rem;
  height: 7rem;
  border-radius: 0.5rem;
  padding: 1rem 1.5rem;
  margin: 1rem 1.5rem 1rem 0;
  text-align: center;
  background-color: ${colors.background.color};
  transition: all 0.2s;

  &:hover {
    background-image: linear-gradient(
      to right bottom,
      ${colors.primary_variant.color},
      ${colors.primary_variant.color}
    );
    cursor: pointer;
  }
`;
