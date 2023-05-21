# URL-Shortner

A URL shortener decreases the length of a URL for you. Large URLs can be complicated to remember or share with others. A shortened URL version can help you share your favorite link more easily.

## Tech Stack

In this project, I used the following technologies:

<p align="center">
  <img src="https://skillicons.dev/icons?i=js,nodejs,express,mongodb,linux,git,vscode,postman" />
</p>

## How it works

1. The user gives a `url` in the request with or without a `slug`.
2. The server checks if the `url` is valid or not.
3. If the `url` is valid, the server checks if the `slug` is already taken or not.
4. If the `slug` is not taken, the server saves the `url` and the `slug` in the database.
5. The server creates different versions of the shortened `url` and based on the `user-agent` header, the server sends the appropriate version of the shortened `url` to the user.

## API Endpoints

You can use the following url form postman docs to check all the endpoints.

*https://documenter.getpostman.com/view/22483128/2s93m32NqR*

## How to use locally

1. Clone the repository

```bash
git clone https://github.com/Diaa-Hassan/URL-Shortner.git
```

2. Create a `.env` file in the root directory of the project and add the following variables _check the `.env.example` file_

```bash
touch .env
echo "PORT=5000" >> .env
echo "MONGO_URI=<your-mongodb-uri>" >> .env
echo "HOST=http://localhost:5000" >> .env
```

3. Install the required packages

```bash
npm install
```

4. Start the server

```bash
npm start
```

## How to use locally with Docker

> first, you need to install Docker and Docker-Compose on your machine. You can follow the instructions on the official website (here)[https://docs.docker.com/get-docker/]

1. Clone the repository

```bash
git clone https://github.com/Diaa-Hassan/URL-Shortner.git
```

2. on the root directory of the project, run the following command

```bash
docker-compose up
```
