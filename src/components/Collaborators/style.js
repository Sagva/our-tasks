import styled from "styled-components";
import colors from "../../theme/colors.json";

export const Collaborators = styled.div`
  grid-area: 2 / 1 / 3 / 2;
  padding: 0.4rem;
  margin: 0 1rem;
  width: 15rem;
  height: 8rem;
  @media (min-width: 1150px) {
    grid-area: 1 / 1 / 3 / 2;
    padding: 0.4rem;
    margin: 0 2rem;
    height: 100vh;
    width: 250px;
    min-width: 250px;
  }
`;
export const BtnContainer = styled.div`
  border-bottom: 1px solid ${colors.background.color};
  @media (min-width: 700px) {
    border-top: 1px solid ${colors.background.color};
    border-bottom: none;
  }
`;
export const Names = styled.div`
  display: flex;

  flex-wrap: wrap;
  @media (min-width: 750px) {
    flex-direction: column;
    justify-content: space-between;
  }
`;
