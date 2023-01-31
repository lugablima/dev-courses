<h1 align="center">DevCourses</h1>

## Tecnologias e conceitos

  - React
  - Styled-components
  - TypeScript
  - Node.js
  - Express
  - Multer
  - PostgreSQL
  - Arquitetura em camadas
  - Autenticação com JWT
  - Armazenamento de imagem em banco de dados
  
## Descrição

O DevCourses é uma aplicação web de cursos, na qual é possível se cadastrar, logar, visualizar e criar algum curso. Já no caso de um usuário administrador, além das funcionalidades já descritas, também é possível ativar, desativar e editar qualquer curso.

## Observações sobre o projeto

Caso algum curso seja desativado pelo administrador, o usuário não será capaz de visualizá-lo na página inicial. Sendo assim, apenas o administrador é capaz de visualizar todos os cursos, tantos os ativos, quantos os desativados.     

## Variáveis de ambiente

Para rodar este projeto, você precisará adicionar as seguintes variáveis de ambiente ao seu arquivo **.env** do **front-end**:

`VITE_API_BASE_URL = endereço onde está rodando a aplicação back-end (Ex: http://localhost:5000)`

Já as variáveis de ambiente a serem adicionas ao seu arquivo **.env** do **back-end** são:

`PORT = número #recomendado:5000`

`DATABASE_URL = postgres://nomeDeUsuário:senha@nomeDoServidor:5432/nomeDoBancoDeDados`

`JWT_SECRET = qualquer string`

## Rodando a aplicação localmente

Clone o projeto

```bash
  git clone https://github.com/lugablima/dev-courses.git
```

Vá para a pasta onde está o projeto back-end

```bash
  cd dev-courses/back/
```

Instale as dependências do projeto

```bash
  npm install
```

Inicie o servidor

```bash
  npm run dev
```

Agora vá para a pasta onde está o projeto front-end

```bash
  cd .. 
  cd front/
```

Instale as dependências do projeto

```bash
  npm install
```

Rode a aplicação

```bash
  npm run dev
```
