import styled from "styled-components";

const FlexBox = styled.div`
  display: flex;
  justify-content: ${(props) => props.jc || ""};
  padding: ${(props) => props.p || ""};
  margin: ${(props) => props.m || ""};
`;
export default FlexBox;
