# 2019Q3 Benchwork: Mongo, Express on TS3 + REST + GraphQL, and Docker Compose

This project is intended to be a playground for Docker/Docker-Compose, however in order to do that you need some functioning modular systems. Thus there is code here for the following:

- A Mongo DB Server (`./Mongo`; with Node handling in `NodeBackend/data/`)
- An Express Instance with: (`./NodeBackend`)
    - REST API (`./NodeBackend/router/`, `./NodeBackend/router/controller`)
    - GraphQL API (`./NodeBackend/router/`, `./NodeBackend/router/gql`)
- Support Scripts (`*.sh`)
- Docker Compose Files **NYI**

There are also API Testing Client files for [Postman (REST + Debugging)](https://www.getpostman.com/) and [Altair (GraphQL)](https://altair.sirmuel.design/).



