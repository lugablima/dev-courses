import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Logo() {
  return (
    <Link to="/">
      <Container>
        <div className="border-bottom">
          <span>
            Dev
            <b>Courses</b>
          </span>
        </div>
      </Container>
    </Link>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 130px;
  margin-bottom: 10px;
  background: transparent;
  font-family: "Bree Serif";
  font-style: normal;
  font-weight: 400;
  font-size: 36px;
  line-height: 49px;
  color: white;
  border: none;

  .border-bottom {
    text-align: center;
    width: 200px;
    border-bottom: 1px solid var(--secondary);
  }

  b {
    color: var(--secondary);
  }
`;
