# Trabalho 1 (CRUD)

Esta aplicação integra com a API do  [Studio Ghibli API](https://ghibliapi.vercel.app/), onde lista os filmes, podendo dar like e deslike caso o usuário esteja autenticado. Não precisando estar autenticado para listar os filmes

Projeto inspirado no site de avaliações de films [imdb](https://www.imdb.com/video/vi2359937305/?listId=ls053181649&ref_=hm_hp_i_hero-video-1_1)

## Getting started

### Requisitos

 - [Node.js](https://nodejs.org/en)


### Instalar ambiente

1. Após instalar os requisitos a cima, Na raiz do projeto, rode o comando 

```bash
$ npm i
```

2. Copiar o arquivo `.env.exemple` na raiz do projeto, renomeando-o para `.env`

3. Rode o ambiente de desenvolvimento


```bash
$ npm run dev
```

4. Agora, se acessar o path `http://localhost:3333`, devera aparecer a seguinte mensagem:

```json
{ "ok": "server is on" }
```

## END Points 

### Autenticação

Endpoint: `POST /auth/login`

Request Body:


```json
{
  "email": "teste@teste.com",
	"password": "1234567"
}

```


### Desautenticar da aplicação

Endpoint: `GET /auth/sign-out`



### Cadastro de usuário

Endpoint: `POST /auth/register`

Request Body:

```json
{
	"firstName": "Gustavo",
	"lastName": "Leite",
	"email": "teste@teste.com",
	"password": "1234567"
}

```

### Retornar dados do usuário - Protect

Endpoint: `GET /auth/me`

Response:

```json
{
	"email": "teste@teste.com",
	"firstName": "Gustavo",
	"id": "102690b2-b1df-47ae-8dd9-fdd48125d73f",
	"lastName": "Leite"
}

```

## Retornar lista de filmes

Endpoint: `GET /movies`

Response:

```json
{
		"id": "2baf70d1-42bb-4437-b551-e5fed5a87abe",
		"title": "Castle in the Sky",
		"original_title": "天空の城ラピュタ",
		"description": "The orphan Sheeta inherited a mysterious crystal that links her to the mythical sky-kingdom of Laputa. With the help of resourceful Pazu and a rollicking band of sky pirates, she makes her way to the ruins of the once-great civilization. Sheeta and Pazu must outwit the evil Muska, who plans to use Laputa's science to make himself ruler of the world.",
		"director": "Hayao Miyazaki",
		"producer": "Isao Takahata",
		"release_date": "1986",
		"running_time": "124",
		"rt_score": "95",
		"image": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/npOnzAbLh6VOIu3naU5QaEcTepo.jpg",
		"movie_banner": "https://image.tmdb.org/t/p/w533_and_h300_bestv2/3cyjYtLWCBE1uvWINHFsFnE8LUK.jpg"
}
```


## Like/Unlike de um filme - Protect

Endpoint: `PATCH /movies/like/:id`


## Retornar lista de filmes que receberam likes - Protect

Endpoint: `GET /movies/favorites`

Response:

```json
{
  "id": "849aecb1-6daa-4713-b634-b37a72f799a4",
  "movie_id": "2baf70d1-42bb-4437-b551-e5fed5a87abe",
  "user_id": "102690b2-b1df-47ae-8dd9-fdd48125d73f"
}

```

## Scripts

- Rodar o ambiente de desenvolvimento: `npm run dev`
- Rodar os testes: `npm run test`