/* eslint-disable no-unused-expressions */
import axios from "axios";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import { IoCreateOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { ReloadContext, useReloadContext } from "../contexts/ReloadContext";
import { UserContext, useUserContext } from "../contexts/UserContext";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface EditButtonsProps {
  courseId: number;
  isEnabled?: boolean;
}

export default function EditButtons({ courseId, isEnabled }: EditButtonsProps) {
  const navigate = useNavigate();
  const { user } = useUserContext() as UserContext;
  const { reload, setReload } = useReloadContext() as ReloadContext;

  function editCourse() {
    const recurse = isEnabled ? "deactivate" : "activate";
    const URL = `${API_BASE_URL}/courses/${recurse}/${courseId}`;
    const config = {
      headers: {
        authorization: `Bearer ${user?.token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    const promise = axios.patch(URL, null, config);
    promise.then(() => {
      reload === null ? setReload(false) : setReload(!reload);
    });
    promise.catch((err) => {
      alert(err.response.data);
    });
  }

  return (
    <Container>
      {isEnabled ? (
        <BsToggleOn size={26} cursor="pointer" onClick={() => editCourse()} />
      ) : (
        <BsToggleOff size={26} cursor="pointer" onClick={() => editCourse()} />
      )}
      <IoCreateOutline
        size={24}
        cursor="pointer"
        color="#334557"
        onClick={() => navigate(`/edit-course/${courseId}`)}
      />
    </Container>
  );
}

const Container = styled.div`
  width: 630px;
  height: 20px;
  background: transparent;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  column-gap: 5px;
  color: #000;
`;
