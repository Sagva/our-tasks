import styled from "styled-components";
import colors from "../../theme/colors.json";

export const ProjectHeader = styled.div`
  border-bottom: 1px solid ${colors.background.color};
  text-align: center;
  position: relative;
`;
export const ProjectName = styled.input`
  border-bottom: 1px solid ${colors.background.color};
  text-align: center;
  font-size: 1.5rem;
  font-weight: 500;
  border: none;
  outline: none;
`;
export const GoBackButton = styled.div`
  display: inline-block;
  position: absolute;
  left: -20px;
  top: 5px;

  &:hover {
    cursor: pointer;
    
  }
`;
