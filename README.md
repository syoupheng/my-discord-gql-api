# My Discord : GraphQL API

## Introduction

Welcome ! This repository contains the backend part of the clone of the Discord web application I implemented. For the frontend part please check out this [repository](https://github.com/syoupheng/my-discord-react-ui).

## Installation

### Requirements

In order to run the backend on your local environment you will need to have **nodeJS v18+** installed. The use of tool like **nvm** is recommended in order to manage different versions of NodeJS.

You will also need to have docker and docker-compose installed ([installation informations](https://docs.docker.com/engine/install/)). This will allow you to run both the database and the API in a containerized environment.

### Environment variables

Once this is done you will have to create a .env file at the root of the project. You can copy the variables that you will find in the .env.example file. If needed change the variables to reflect your environment. The `CLIENT_URL` should match the url of the frontend application. Moreover if you want to try the ChatGPT features you will have to create an OpenAI account, get an API key and update the `OPENAI_API_KEY` environment variable.

### Installing dependencies

All the dependencies required for this project can be installed with the `npm install` command.

## Start the backend application

### Launch the Docker containers

The containers can be started with a single command : `docker compose up --build` or `docker-compose up --build`.

### Database setup

At this point you should have a nodeJS API connected to a running PostgreSQL database but this database does not contain any tables for now. In order to create these tables run this command locally (no need to execute this command inside the container) : `npx prisma db push`

Now that our tables ara created we can populate them by running `npx prisma db seed`. You can check your database by running `npx prisma studio`. This will open a new window in your browser that will allow you to easily display the data inside your database.

### How to use the API

That's it ! You should now be able to interact with the API at _http://localhost:3500/graphql_ using a tool like Postman for example. Alternatively, you can also use the GraphQL playground by opening the url directly in your browser. Have fun 😊 !
