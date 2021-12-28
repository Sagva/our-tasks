import styled from "styled-components";
import colors from "../../theme/colors.json";

export const Card = styled.div`
  font-size: 1.2rem;
  color: ${colors.background.onColor};
  width: 13rem;
  height: 10rem;
  border-radius: 0.5rem;
  padding: 1rem 1.5rem;
  margin: 1rem 1.5rem;
  text-align: center;
  background-image: linear-gradient(
    to right bottom,
    ${colors.background.color},
    ${colors.primary_variant.color}
  );
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
