# Storefront Backend Project

## Getting Started

Clone this repo and run `npm install`. 
Add the `.env` file to the root of the project to define the environment variables, you can find an example of how it should look like in the 
`.env-example` file.

## Database Setup
The storefront connects to a postgress database, in order to set up the databases:
- Run `docker-compose up`
- Create databases if they are not created yet, to do so:
    - Get the container id and run:
    `docker exec -it <container_postgres_id> bash`
    - Run `psql -U postgres` to connect to postgres.
    - Check if databases needed exist, for the app it self and separate databse for running tests `\psql`
    - If databases dont' exist, create.
        `create database lucymtc_storefront;`
        `create database lucymtc_storefront_tests;`

- Run `db-migrate up` to run the databse migrations.

## Running the app
Run `npm run build && npm start`
Run `npm run watch` for running during development and listen for file changes.

Included in this repo there is a postman collection export to facilitate the api endpoints testing `StoreFront API.postman_collection.json`

### Ports
Postgres port runs on 5432 by default and the node app on port 3000
You can change these values in the `.env` file as well as the `docker-compose.yml`

## Running tests
Run `npm run test`
The environment will be set to `test` and use the test database specified in `POSTGRES_DB_TEST`
