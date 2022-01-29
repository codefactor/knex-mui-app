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
This is the client UI, which is where you can interact with the bot's API.

## Smart contracts

### Flash loans
Those services provide flash loans:

#### www.aave.com
https://docs.aave.com/developers/guides/flash-loans

#### Uniswap
- https://docs.uniswap.org/protocol/V2/guides/smart-contract-integration/using-flash-swaps
- Flash loan example using Uniswap:
https://github.com/Uniswap/v3-periphery/blob/main/contracts/examples/PairFlash.sol

#### Sushi
https://dev.sushi.com/bentobox-1/bentobox-vault#flash-loans

#### Kollateral
https://www.kollateral.co/

#### Dy/Dx
https://money-legos.studydefi.com/#/dydx
https://github.com/QuantSoldier/dydx-flashloan

### Development environment

#### Truffle / Ganache
https://trufflesuite.com/docs/ganache/overview
Best environment to develop and test smart contracts locally.

#### Infura
https://infura.io
This online service can be used to connect to the Ethereum network.

### Tutorials
- https://soliditydeveloper.com/multiswap
- https://soliditydeveloper.com/multiswap-advanced
- https://trufflesuite.com/boxes/flashloan-box/
- https://github.com/Uniswap/v3-periphery/blob/main/contracts/examples/PairFlash.sol
