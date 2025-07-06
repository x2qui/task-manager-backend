# Caseworker Task Management API – HMCTS Developer Challenge

A simple REST API backend to help caseworkers manage their daily tasks. Built using Node.js + TypeScript + Express.

## Features

- Create, retrieve, update (status), and delete tasks
- Task fields: title, description (optional), status, dueDate
- Structured in MVC format
- Tested with Jest + Supertest

## Getting Started

```bash
npm install
npm run start
```

## Running Tests

```bash
npm test
```

## API Endpoints

- `GET /tasks` – list all tasks
- `GET /tasks/:id` – get a specific task
- `POST /tasks` – create a new task
- `PATCH /tasks/:id/status` – update the status of a task
- `DELETE /tasks/:id` – delete a task