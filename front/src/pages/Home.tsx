import axios from "axios";
import { useState, useEffect } from "react";
import styled from "styled-components";

import CourseScreen from "../components/CourseScreen";
import { ReloadContext, useReloadContext } from "../contexts/ReloadContext";
import { UserContext, useUserContext } from "../contexts/UserContext";
import Page from "../layouts/Page";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface Image {
  id: number;
  name: string;
  type: string;
  data: Buffer | string;
}

export interface Course {
  id: number;
  name: string;
  teacher?: string;
  category?: string;
  description: string;
  image: Image;
  isEnabled?: boolean;
}

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const { user } = useUserContext() as UserContext;
  const { reload } = useReloadContext() as ReloadContext;

  useEffect(() => {
    const URL = `${API_BASE_URL}/courses`;

    const promise = axios.get(URL);
    promise.then((res) => {
      setCourses(res.data);
    });
  }, [reload]);

  return (
    <Container>
      <Page>
        <div className="courses-container">
          {courses.length > 0
            ? courses.map((course, index) => {
                if (user?.isAdmin)
                  return <CourseScreen key={index} course={course} />;
                if (course.isEnabled)
                  return <CourseScreen key={index} course={course} />;
              })
            : ""}
        </div>
      </Page>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  display: flex;
  padding: 0 30px;
  box-sizing: border-box;
  justify-content: center;
  background: var(--gray-01);

  .courses-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 90px 0 30px;
  }
`;
