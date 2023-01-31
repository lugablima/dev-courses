import { Link } from "react-router-dom";
import styled from "styled-components";

import { UserContext, useUserContext } from "../contexts/UserContext";
import { Course } from "../pages/Home";
import EditButtons from "./EditButtons";

interface CourseScreenProps {
  course: Course;
}

export default function CourseScreen({ course }: CourseScreenProps) {
  const { user } = useUserContext() as UserContext;

  return (
    <>
      <Link to={`/course/${course.id}`}>
        <Container>
          <div className="text-container">
            <h1>
              {course.name}
              <span> • </span>
              {course.teacher}
            </h1>
            <h3>{course.description}</h3>
            <h4>{course.category}</h4>
          </div>
          <img
            src={`data:${course.image?.type};base64,${course.image.data}`}
            alt={course.name}
          />
        </Container>
      </Link>
      {user?.isAdmin && (
        <EditButtons courseId={course.id} isEnabled={course.isEnabled} />
      )}
    </>
  );
}

const Container = styled.button`
  width: 630px;
  height: 280px;
  background: var(--tertiary);
  font-family: inherit;
  font-style: normal;
  color: white;
  border: none;
  border-radius: 15px;
  position: relative;
  text-align: start;
  padding: 0;
  &:focus-visible,
  &:hover {
    outline: none;
    filter: brightness(1.1);
  }

  img {
    z-index: 0;
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
    border-radius: 15px;
    height: 100%;
    width: 100%;
  }

  .text-container {
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 1;
    box-sizing: border-box;
    padding: 15px;
    border-radius: 15px;
    background-color: rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 100%;
  }

  h1 {
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
  }

  h1 span {
    font-size: 16px;
    margin: auto 0;
  }

  h3 {
    font-style: italic;
    font-size: 18px;
    line-height: 24px;
  }

  h4 {
    font-style: 300;
    font-size: 18px;
    line-height: 24px;
  }
`;
