import axios from "axios";
import { FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import Form from "../components/Form";
import Title from "../components/Title";
import { UserContext, useUserContext } from "../contexts/UserContext";
import Page from "../layouts/Page";
import { FormData } from "./SignUp";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function EditCourse() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { user } = useUserContext() as UserContext;
  const [name, setName] = useState<string>("");
  const [teacher, setTeacher] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<File | null>();
  const [disabled, setDisabled] = useState<boolean>(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDisabled(true);

    const URL = `${API_BASE_URL}/courses/edit/${courseId}`;
    const data = {
      name,
      teacher,
      category,
      description,
      image,
    };

    Object.keys(data).map(
      (key) =>
        !data[key as keyof typeof data] &&
        delete data[key as keyof typeof data],
    );

    const config = {
      headers: {
        authorization: `Bearer ${user?.token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    const promise = axios.patch(URL, data, config);
    promise.then(() => {
      navigate("/");
    });
    promise.catch((err) => {
      alert(err.response.data);
      setDisabled(false);
    });
  }

  const formData: FormData = {
    form: { onSubmit: handleSubmit },
    inputs: [
      {
        onChange: (e) => {
          setName(e.target.value);
        },
        value: name,
        placeholder: "Digite o nome do curso",
        required: false,
        type: "text",
        label: "NOME DO CURSO",
        disabled,
        minlength: 2,
      },
      {
        onChange: (e) => {
          setTeacher(e.target.value);
        },
        value: teacher,
        placeholder: "Digite o nome do professor responsável",
        type: "text",
        label: "NOME DO PROFESSOR",
        required: false,
        disabled,
        minlength: 2,
      },
      {
        onChange: (e) => {
          setCategory(e.target.value);
        },
        value: category,
        placeholder: "Digite a categoria (Ex: Programação, Design, etc)",
        type: "text",
        label: "CATEGORIA",
        required: false,
        disabled,
        minlength: 2,
      },
      {
        onChange: (e) => {
          setDescription(e.target.value);
        },
        value: description,
        placeholder: "Digite uma breve descrição do curso",
        type: "text",
        label: "DESCRIÇÃO",
        required: false,
        disabled,
        minlength: 2,
      },
      {
        onChange: (e) => {
          setImage(e.target.files && e.target.files[0]);
        },
        placeholder: "Coloque uma imagem",
        type: "file",
        label: "IMAGEM",
        required: false,
        disabled,
        enctype: "multipart/form-data",
      },
    ],
    button: {
      text: "Editar curso",
      disabled,
    },
  };

  return (
    <Container>
      <Page>
        <Title text="Editar curso" />
        <Form data={formData} />
      </Page>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  padding: 0 30px;
  box-sizing: border-box;
  justify-content: center;
  background: var(--gray-01);
`;
