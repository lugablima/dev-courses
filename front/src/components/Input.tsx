import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  height: 38px;
  background-color: transparent;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid var(--gray-04);
  font-family: inherit;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 14px;
  color: var(--secondary);
  padding: 12px 0;
  &::placeholder {
    color: var(--gray-04);
    font-size: 12px;
    font-weight: 300;
  }
  &:focus-visible {
    outline: none;
  }
  &:disabled {
    filter: brightness(0.5);
  }
  &:disabled::placeholder {
    color: var(--dark-gray-2);
  }
`;

export default Input;
