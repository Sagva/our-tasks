import styled from "styled-components";
import colors from "../../theme/colors.json";

export const Wrapper = styled.div`
  background-color: #fff;
  margin: 0.5rem;
  padding: 0.5rem;
  border-radius: 7px;
  box-shadow: 0px 5px 13px -7px ${colors.primary_accent.color};

  &:hover {
    background-color: #c9c9ca6e;
    cursor: pointer;
  }
`;
export const Title = styled.p`
  font-size: 1.1rem;
  border-bottom: 1px solid #c9c9ca6e;
`;
export const Created = styled.div`
  font-size: 0.8rem;
  color: ${colors.light_gray.color};
`;
