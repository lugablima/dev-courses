import styled from "styled-components";

interface TitleProps {
  text: string;
}

export default function Title({ text }: TitleProps) {
  return <Container>{text}</Container>;
}

const Container = styled.h6`
  font-style: normal;
  font-weight: 400;
  font-size: 36px;
  line-height: 49px;
  color: var(--primary);
  text-align: center;
  margin: 80px 0 20px;
`;
