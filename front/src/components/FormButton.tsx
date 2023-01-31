import { ReactNode } from "react";
import styled from "styled-components";

import loadingButton from "../assets/images/loading_button.svg";

interface FormButtonProps {
  disabled: boolean;
  children: ReactNode;
}

export default function FormButton({ disabled, children }: FormButtonProps) {
  return (
    <Container disabled={disabled} type="submit">
      {disabled ? <img src={loadingButton} alt="loading" /> : children}
    </Container>
  );
}

const Container = styled.button`
  width: 100%;
  height: 40px;
  background: var(--gradient-primary);
  box-shadow: 0px 10px 16px 4px rgba(0, 0, 0, 0.25);
  font-family: inherit;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: white;
  border: none;
  border-radius: 30px;
  &:focus-visible,
  &:hover {
    outline: none;
    filter: brightness(1.1);
  }
  &:disabled {
    opacity: 70%;
    cursor: initial;
  }
  img {
    object-fit: cover;
    height: 100%;
  }
`;
