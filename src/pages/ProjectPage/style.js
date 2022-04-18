import styled from "styled-components";
import colors from "../../theme/colors.json";

export const ParentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 50px min-content 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;

  @media (min-width: 1150px) {
    grid-template-columns: 280px 1fr;
    grid-template-rows: 50px min-content;
  }
`;
export const HeaderContainer = styled.div`
  grid-area: 1 / 1 / 2 / 2;

  @media (min-width: 1150px) {
    grid-area: 1 / 2 / 2 / 3;
  }
`;
export const Header = styled.div`
  border-bottom: 1px solid ${colors.background.color};
  text-align: center;
  position: relative;
  margin-bottom: 2rem;
`;
export const Name = styled.input`
  border-bottom: 1px solid ${colors.background.color};
  background-color: transparent;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 500;
  border: none;
  outline: none;
`;
export const GoBackButton = styled.div`
  display: inline-block;
  position: absolute;
  left: 5px;
  top: 5px;

  &:hover {
    cursor: pointer;
  }
  @media (min-width: 1150px) {
    left: -10px;
  }
`;
export const TaskSection = styled.div`
  grid-area: 3 / 1 / 4 / 2;
  display: flex;
  flex-direction: column;

  @media (min-width: 1150px) {
    grid-area: 2 / 2 / 3 / 3;
    flex-direction: row;
  }
`;
