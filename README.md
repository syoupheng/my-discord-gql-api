# My Discord : GraphQL API

## Introduction

Welcome ! This repository contains the backend part of the clone of the Discord web application I implemented. For the frontend part please check out this [repository](https://github.com/syoupheng/my-discord-react-ui).

## Installation

### Requirements

You will need to have docker and docker-compose installed ([installation informations](https://docs.docker.com/engine/install/)). This will allow you to run both the database and the API in a containerized environment.

### Environment variables

Once this is done you will have to create a .env file at the root of the project. You can copy the variables that you will find in the .env.example file. If needed change the variables to reflect your environment. The `CLIENT_URL` should match the url of the frontend application. Moreover if you want to try the ChatGPT features you will have to create an OpenAI account, get an API key and update the `OPENAI_API_KEY` environment variable.

## Start the backend application

### Launch the Docker containers

The containers can be started with a single command : `docker compose up --build` or `docker-compose up --build`.

### Database setup

At this point you should have a nodeJS API connected to a running PostgreSQL database but this database does not contain any tables for now. In order to create these tables you will have to execute commands inside your docker container. In order to do that run : `docker exec -it my-discord-api bash`. This will open a shell inside the container for your API. You can now create the database tables by running (don't worry about the permission error) : `npx prisma db push`

Now that our tables ara created we can populate them by running `npx prisma db seed`. You can check your database by running `npx prisma studio` locally (you will need to have nodeJS and npm installed). This will open a new window in your browser that will allow you to easily display the data inside your database.

### Troubleshooting

If you want to do local development and you get errors inside your editor about modules not being found, you can copy the node_modules/ folder inside the container on your local machine with : `docker cp my-discord-api:/usr/src/app/node_modules .`

### How to use the API

That's it ! You should now be able to interact with the API at _http://localhost:3500/graphql_ using a tool like Postman for example. Alternatively, you can also use the GraphQL playground by opening the url directly in your browser. Have fun 😊 !
