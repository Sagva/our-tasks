import styled from "styled-components";
import colors from "../../theme/colors.json";

export const Wrapper = styled.div`
  background-color: ${colors.background.color};
  padding: 0.4rem;
  margin: 1.5rem 1rem;
  border-radius: 10px;
  flex-grow: 1;
  width: 90%;

  @media (min-width: 750px) {
    max-width: 400px;
  }
`;
export const Header = styled.h5`
  text-align: center;
  padding: 0.5rem 0;
  margin-bottom: 1rem;
`;
