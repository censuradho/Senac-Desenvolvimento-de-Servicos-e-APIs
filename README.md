# Trabalho final

Este trabalho consiste no desenvolvimento de APIs RESTful (Web Services RESTful) com persistência da nossa aplicação Web. O objetivo deste trabalho é permitir os alunos aplicarem os conceitos e funcionalidades do REST e dos padrões de persistência vistos em aula. Nesse trabalho, a ideia é realizar o back-end do trabalho.

## Sumário

- [Trabalho final](#trabalho-final)
  * [Instruções gerais](#instru-es-gerais)
  * [Avaliação](#avalia-o)
  * [Tema](#tema)
  * [Getting started](#getting-started)
    + [Requisitos](#requisitos)
    + [Instalar ambiente](#instalar-ambiente)
  * [END Points](#end-points)
    + [Autenticação (Candidate/Employer)](#autentica-o-candidate-employer)
      - [Login Candidate](#login-candidate)
      - [Login Employer](#login-employer)
      - [Cadastro Candidate](#cadastro-candidate)
      - [Cadastro Employer](#cadastro-employer)
      - [Informações sobre o Candidate](#informa-es-sobre-o-candidate)
      - [Informações sobre o Employer](#informa-es-sobre-o-employer)
      - [Sign out da aplicação](#sign-out-da-aplica-o)
    + [Company](#company)
      - [Criação de uma company](#cria-o-de-uma-company)
      - [Add avatar para empresa](#add-avatar-para-empresa)
    + [Review](#review)
      - [Criar uma avaliação](#criar-uma-avalia-o)
      - [Listar avaliações do candidato logado](#listar-avalia-es-do-candidato-logado)
    + [Invite](#invite)
      - [Criação de convites](#cria-o-de-convites)
  * [Scripts](#scripts)

## Instruções gerais

O trabalho possui um tema livre com algumas restrições quanto às funcionalidades, ou seja, o(s) aluno(s) poderá(ão) trabalhar com um domínio de aplicação de seu interesse. 
Com base nessa especificação, o(s) aluno(s) (individual ou dupla) deverá(ão) desenvolver o back-end da aplicação. Para isso, todas as APIs devem ser implementados e testados - utilizando a ferramenta Postman (vista em aula). As APIs deverão contemplar pelo menos dois CRUD de entidades e uma funcionalidade específica, e essas funcionalidades deverão persistir seus dados em um banco de dados.
Caso o aluno não tenha ideia de trabalho, o aluno deverá realizar a aplicação biblioteca descrito no anexo do Escopo do Trabalho (abaixo).
A aplicação desenvolvida deverá contemplar alguns assuntos vistos em aula. Assim, a avaliação será baseada de acordo com as funcionalidades a serem desenvolvidas e com os conceitos de REST (vistos em aula) empregados para o desenvolvimento dessa aplicação.

## Avaliação

O conceito desse trabalho será baseado de acordo com as funcionalidades realizadas no trabalho e com os conceitos de REST e persistência empregados no trabalho. Abaixo segue a relação de conceitos e features a serem realizadas no trabalho:
Conceito C:
- Apresentação de forma clara (para o professor);
- Duas APIs RESTful realizando CRUD funcionando de forma correta com persistência (um para cada aluno);
- Testes das APIs corretamente.
Conceito B:
- Realizar as tarefas para alcançar o conceito C;
- Realizar uma funcionalidade de negócio (ou CRUD) que manipule duas entidades simultaneamente na aplicação como um todo (utilizando APIs de forma correta e adequada) - no caso do retorno do buscarPorId, retornar os dois objetos relacionados e nos outros casos, verificar corretamente as restrições de FK;
- Utilização de um sistema de controle de versão (ex: git) e de um ambiente de colaboração e gerenciamento de código baseado nesse controle de versão (ex: GitHub, Bitbucket). Caso o trabalho seja em grupo, a colaboração deve estar evidenciada;
- Testes unitários aplicados utilizando Jest (pelo menos uma entidade para cada aluno - trabalhando com cenários de sucesso e pelo menos um de exceção - quando tiver).
- Modelagem apropriada das APIs (retorno dos status code correto) e do código (visto em aula);
Conceito A:
- Aplicação completa, realizando todas as funcionalidades do conceito B com regras de negócio aplicadas corretamente;
- Tratamento de erros, regras de negócio e exceções;
- Testes de APIs utilizando Jest e Supertest;
- Utilizar autenticação aplicando técnicas de segurança adequadamente (OAuth e JWT); ou uma das seguintes funcionalidades não vistas em aula: Implantar os Web Services em um servidor na nuvem: Heroku, Digital Ocean, etc; Swagger; 

## Tema 

Se trata de um sistema em que candidatos podem avaliar empresas

- Cadastro de empresa
- Cadastro de candidato
- Geração de convites pela empresa para avaliação
- Avaliação da empresa pelo candidato
- Autenticação via email/senha com token JWT serverOnly

## Getting started

### Requisitos

 - [Node.js](https://nodejs.org/en)


### Instalar ambiente

1. Após instalar os requisitos a cima, Na raiz do projeto, rode o comando 

```bash
$ npm i
```

2. Copiar o arquivo `.env.exemple` na raiz do projeto, renomeando-o para `.env`

3. Gerando o banco de dados local

```bash
npm run generate
```

4. Rode o ambiente de desenvolvimento

```bash
$ npm run dev
```

5. Agora, se acessar o path `http://localhost:3333`, devera aparecer a seguinte mensagem:

```json
{ "ok": "server is on" }
```

## END Points 

### Autenticação (Candidate/Employer)

#### Login Candidate

Endpoint: `POST /auth/login/candidate`

Request Body:


```json
{
  "email": "teste@teste.com",
	"password": "1234567"
}
```

#### Login Employer

Endpoint: `POST /auth/login/employer`

Request Body:


```json
{
  "email": "teste@teste.com",
	"password": "1234567"
}
```

#### Cadastro Candidate

Endpoint: `POST /auth/register/candidate`

Request Body:


```json
{
	"firstName": "Gustavo",
	"lastName": "Leite",
	"email": "teste@candidate.com",
	"password": "candidate"
}
```

#### Cadastro Employer

Endpoint: `POST /auth/register/employer`

Request Body:


```json
{
	"firstName": "Gustavo",
	"lastName": "Leite",
	"email": "teste@candidate.com",
	"password": "candidate"
}
```

#### Informações sobre o Candidate

Endpoint: `GET /auth/me/candidate`

Response Body:


```json
{
	"email": "teste@candidate.com",
	"firstName": "Gustavo",
	"id": "fcae4216-1874-48c3-9243-fc6e0a7cd2bf",
	"lastName": "Leite",
	"role": "CANDIDATE",
	"candidate": {
		"id": "84fafb3c-c1d1-4f87-bf19-f6a2e2b226c9",
		"user_id": "fcae4216-1874-48c3-9243-fc6e0a7cd2bf"
	}
}
```

#### Informações sobre o Employer

Endpoint: `GET /auth/me/employer`

Response Body:


```json
{
	"email": "teste@teste.com",
	"firstName": "Gustavo",
	"id": "02a09b55-d82c-4997-a98b-2a36ff5074a4",
	"lastName": "Leite",
	"role": "EMPLOYER",
	"employer": {
		"access_level": "ADMIN"
	}
}
```
#### Sign out da aplicação

Endpoint: `GET /auth/sign-out
`

### Company

#### Criação de uma company

Endpoint: `POST /company`

Request Body:

```json
{
	"name": "Vortigo",
	"cnpj": "83.629.204/0001-13",
	"site": "https://meusite.com",
	"type": "COMPANY_PUBLIC",
	"description": "asdasdasd"
}
```

#### Add avatar para empresa

Endpoint: `PUT /company/avatar`

Request Body

form-data: file  (`jpeg|jpg|png|gif`)


### Review

#### Criar uma avaliação

Endpoint: `POST /review`

Request body

```json
{
	"jobTitle": "Software Engineer",
	"nps": 10,
	"jobLink": "https://google.com/teste",
	"category": "categoria",
	"description": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
	"company_id": "cf33c1ee-cd79-436f-a695-2a583142cb82",
	"invite_id": "ea69b4b2-54ff-488f-818e-d9faef9d83bf"
}
```

#### Listar avaliações do candidato logado

Endpoint: `GET /review`

Response body

```json
[
		{
		"id": "e8e88624-b837-4c96-92ca-ef32030f07a9",
		"invite_id": "e6046404-1949-44dd-aaff-fb94d8f34560",
		"nps": 10,
		"jobTitle": "Software Engineer",
		"description": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
		"category": "categoria",
		"jobLink": "https://google.com/teste",
		"candidate_id": "5e5fd30a-1687-447d-b24f-a8acb02d282d",
		"company_id": "cf33c1ee-cd79-436f-a695-2a583142cb82",
		"createdAt": "2024-11-12T22:55:24.916Z",
		"updatedAt": "2024-11-12T22:55:24.916Z"
	},
]
```

### Invite

#### Criação de convites

Endpoint: `POST /review`

Request body

```json
{
	"validDays": 30
}
```

## Scripts

- Rodar o ambiente de desenvolvimento: `npm run dev`
- Rodar os testes: `npm run test`