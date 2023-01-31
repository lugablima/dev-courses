/* eslint-disable react/jsx-no-useless-fragment */
import { IoPersonCircle, IoArrowBack, IoAddCircle } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

import { useUserContext, UserContext } from "../contexts/UserContext";

function DefaultHeader() {
  const navigate = useNavigate();
  const { user } = useUserContext() as UserContext;
  return (
    <>
      <IoAddCircle
        cursor="pointer"
        onClick={() => {
          if (!user) {
            navigate("/signin");
            return;
          }
          navigate("/add-course");
        }}
      />
      <p>DevCourses</p>
      <IoPersonCircle cursor="pointer" />
    </>
  );
}

function HeaderArrow() {
  const navigate = useNavigate();

  return (
    <>
      <IoArrowBack cursor="pointer" onClick={() => navigate(-1)} />
      <p>DevCourses</p>
      <IoPersonCircle cursor="pointer" />
    </>
  );
}

export default function Header() {
  const location = useLocation();
  const path = location.pathname;

  function RenderHeader() {
    let header;
    if (path === "/add-course" || path.includes("/edit-course"))
      header = <HeaderArrow />;
    else if (path === "/") header = <DefaultHeader />;

    return header;
  }

  const header = RenderHeader();

  return (
    <>
      {path !== "/signin" && path !== "/signup" && (
        <div>
          <Container>{header}</Container>
        </div>
      )}
    </>
  );
}

const Container = styled.div`
  width: 100%;
  height: 60px;
  padding: 12px 15px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--primary);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  color: #fff;
  font-size: 30px;
  p {
    width: 122px;
    height: 34px;
    font: 400 24px/33px "Bree Serif", serif;
    border-bottom: 0.67px solid var(--secondary);
    text-align: center;
  }
`;
