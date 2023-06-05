import styled from "styled-components";

const BlackButton = styled.button`
  border-radius: 9999px;
  border: 1px solid #000;
  background-color: #000;
  padding: 0.375rem 1.25rem;
  color: #fff;
  transition: all 0.3s;
  text-align: center;
  font-size: 0.875rem;
  font-family: "Inter", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  height: fit-content;

  &:hover {
    background-color: #fff;
    color: #000;
  }
`;

const OutlineButton = styled.button`
  border-radius: 9999px;
  border: 1px solid #000;
  background-color: transparent;
  padding: 0.375rem 2.55rem;
  color: #000;
  transition: all 0.3s;
  text-align: center;
  font-size: 0.875rem;
  font-family: "Inter", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  height: fit-content;

  &:hover {
    background-color: #000;
    color: #fff;
  }
`;
export { BlackButton, OutlineButton };
