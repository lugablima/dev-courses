import axios from "axios";
import { useState, useEffect, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import Form from "../components/Form";
import Logo from "../components/Logo";
import { UserContext, useUserContext } from "../contexts/UserContext";
import Page from "../layouts/Page";
import { FormData } from "./SignUp";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function SignIn() {
  const navigate = useNavigate();
  const { user, setUser } = useUserContext() as UserContext;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDisabled(true);

    const URL = `${API_BASE_URL}/signin`;
    const data = {
      email,
      password,
    };

    const promise = axios.post(URL, data);
    promise.then((res) => {
      setUser({ ...res.data });
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
          setEmail(e.target.value);
        },
        value: email,
        placeholder: "Digite seu endereço de e-mail",
        required: true,
        type: "email",
        label: "E-MAIL",
        disabled,
      },
      {
        onChange: (e) => {
          setPassword(e.target.value);
        },
        value: password,
        placeholder: "Digite sua senha",
        type: "password",
        label: "SENHA",
        required: true,
        disabled,
        minlength: 6,
      },
    ],
    button: {
      text: "Entrar",
      disabled,
    },
  };

  return (
    <Container>
      <Page>
        <Logo />
        <Form data={formData} />
        <span className="link">
          Ainda não cadastrado? <Link to="/signup">Crie uma conta</Link>
        </span>
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
  background: var(--gradient-background);

  .link {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: var(--gray-04);

    a {
      color: var(--secondary);
    }
  }
`;
