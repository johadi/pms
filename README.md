# PMS

**PMS** is an API for creating and managing population of a location — built with Typescript and NodeJS.

## Application features

* Create a location (with the population details)
* Get the details of a location (with its sub-locations)
* Update the details of a location
* Get all locations (with their sub-locations)
* Delete a location

## Technology stacks
- [TypeScript](https://typescriptlang.org/) A strict syntactical superset of JavaScript, and adds optional static typing to the language.
- [Node js](https://nodejs.org/en/) is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Express js](http://expressjs.com/) handles backend routing.
- [Sequelize](http://docs.sequelizejs.com/) Sequelize is a promise-based ORM for Node.js and io.js. It supports the dialects PostgreSQL, MySQL, MariaDB, SQLite and MSSQL and features solid transaction support, relations and many more.
- [PostgreSQL](https://www.postgresql.org/) A powerful, open source object-relational database system.

## Installation
This is the installation guide for starting up the API.

-   Install [Node js](https://nodejs.org/en/) and [Postgres](https://www.postgresql.org/) on your machine
-   Clone the repository `git clone https://github.com/johadi/pms.git`
-   Change into the directory `cd pms`
-   Install all required dependencies with `npm install`
-   For easier accessibility, Install sequelize-cli globally for database migrations `npm install -g sequelize-cli`
-   Create a `.env` file in your root directory and follow the pattern in the .env.sample file to create environmental variables
-   Migrate your database by running this command `sequelize db:migrate`
-   You can undo your migrations by running this command `sequelize db:migrate:undo:all`.
-   Open a terminal and run `npm run start` to start the api.
-   Navigate to `localhost:8000` on your postman or any other application for testing APIs

## Testing
-   Run `npm test`

## Limitation
-   A location can only contain one level of locations.

## Want to contribute ?
  * Fork the repository
  * Make your contributions
  * Make sure your work is well tested
  * Create Pull request against the **development** branch.

## License
MIT