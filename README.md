# Application

This application has a web UI/client, with a node/express API interface, and a database for storage.

1. express
2. knex (database queries)
3. postgres (database)
4. create-react-app (ui platform)
5. material ui (front-end user experience)

## Prerequisites

1. `NodeJS` installed, tested with version 14.18.3

```bash
> node --version
v14.18.3
```

2. `docker` installed, tested with 20.10.8

```bash
> docker --version
Docker version 20.10.8, build 3967b7d
```

## Getting Started

To start the server create a `.env` file which is not committed to source control.

Here is a sample to get started:

```
DEV_MODE=true
DATABASE_URL=postgres://hbotuser:Pass1234@localhost:5432/hbotdb
SESSION_SECRET=f247e82980cb957e3e23767286ee92826a348a0ff2fcb1634ce1cbda30352498
SERVER_URL=http://localhost:3000
```

Then you can run the following commands to start the server:

```bash
yarn install
yarn dev
```

This will open a browser automatically: http://localhost:3000
This is the client UI, which is where you can interact with the API.
