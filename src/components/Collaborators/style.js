import styled from "styled-components";
import colors from "../../theme/colors.json";

export const Collaborators = styled.div`
  grid-area: 2 / 1 / 3 / 2;
  padding: 0.4rem;
  margin: 0 1rem;
  height: fit-content;

  @media (min-width: 750px) {
    width: 15rem;
  }

  @media (min-width: 1150px) {
    grid-area: 1 / 1 / 3 / 2;
    padding: 0.4rem;
    margin: 0 2rem;

    width: 250px;
    min-width: 250px;
  }
`;
export const BtnContainer = styled.div`
  border-bottom: 1px solid ${colors.background.color};
  padding-top: 0.5rem;
  @media (min-width: 700px) {
    border-top: 1px solid ${colors.background.color};
    border-bottom: none;
  }
`;
export const Names = styled.div`
  display: flex;
  font-weight: 600;
  flex-wrap: wrap;
  border-radius: 5px;

  @media (min-width: 750px) {
    flex-direction: column;
    justify-content: space-between;
  }
`;
export const Paragraph = styled.p`
  width: fit-content;
  margin: 5px;
  padding: 5px 10px;
  border-radius: 15px;
  font-weight: 400;
  color: ${(props) => (props.currentUser ? `#ffffffCC` : `#0942ADCC`)};
  background-color: ${(props) =>
    props.currentUser ? `#0942ADCC` : `#ffffffCC`};
`;
