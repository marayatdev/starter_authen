# Starter Authentication Project

This repository is a full-stack starter project for implementing authentication with role-based access control. It includes a **Node.js** server with **TypeScript**, **Prisma**, **Argon2** for password hashing, and **JWT** for token-based authentication. The project is Dockerized with **Docker Compose** to set up a **MySQL** database. The client side is built with **React**, featuring login, registration, protected routes based on roles, and navigation handling.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)


## Features
- **Server**: Node.js (TypeScript), Prisma ORM, Argon2 password hashing, JWT-based authentication.
- **Client**: React, with login and register forms, protected routes, and role-based routing.
- **Database**: MySQL containerized using Docker Compose.
- **Role-Based Access Control**: Restrict access to pages based on user roles.

## Prerequisites
Make sure you have the following installed:
- [Node.js >= v20.18.0](https://nodejs.org/)  
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)

## Installation
Follow these steps to get the project up and running:

### 1. Clone the Repository
```bash
git clone https://github.com/marayatdev/Starter_Project.git
cd starter_authen
