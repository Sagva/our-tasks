import styled from "styled-components";
import colors from "../../theme/colors.json";

export const Collaborators = styled.div`
  padding: 0.4rem;
  margin: 0 1rem;
  width: 15rem;
  height: 8rem;
  @media (min-width: 750px) {
    padding: 0.4rem;
    margin: 0 2rem;
    height: 100vh;
    width: 250px;
    min-width: 250px;
  }
`;
export const Heading = styled.h5`
  display: none;

  @media (min-width: 750px) {
    display: block;
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
  justify-content: space-between;
  flex-wrap: wrap;
  @media (min-width: 750px) {
    flex-direction: column;
  }
`;
