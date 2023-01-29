import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import Form from "../components/Form";
import Logo from "../components/Logo";
import { UserContext, useUserContext } from "../contexts/UserContext";
import Page from "../layouts/Page";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface FormField {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

interface InputField {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder: string;
  required: boolean;
  type: string;
  label: string;
  disabled: boolean;
  minlength?: number;
}

interface ButtonField {
  text: string;
  disabled: boolean;
}

export interface FormData {
  form: FormField;
  inputs: InputField[];
  button: ButtonField;
}

export default function SignUp() {
  const navigate = useNavigate();
  const { user } = useUserContext() as UserContext;
  const [name, setName] = useState("");
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

    const URL = `${API_BASE_URL}/signup`;
    const data = {
      name,
      email,
      password,
    };

    const promise = axios.post(URL, data);
    promise.then(() => {
      navigate("/login");
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
        placeholder: "Digite seu nome completo",
        required: true,
        type: "text",
        label: "NOME COMPLETO",
        disabled,
        minlength: 2,
      },
      {
        onChange: (e) => {
          setEmail(e.target.value);
        },
        value: email,
        placeholder: "Digite seu endereço de e-mail",
        type: "email",
        label: "E-MAIL",
        required: true,
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
      text: "Cadastrar",
      disabled,
    },
  };

  return (
    <Container>
      <Page>
        <Logo />
        <Form data={formData} />
        <span className="link">
          Já possui uma conta? <Link to="/signin">Entrar</Link>
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
