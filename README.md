# SMS MANAGER

**SMS Manager** is an API where message can be sent from one contact to the other — built with Typescript and NodeJS.

## Application features

* Create contact
* Send message to contact
* Get contact details
* Update contact details
* Get messages sent by a contact
* Get messages received by a contact
* Get all messages associated to a contact (whether sent or received)
* Get the details of a specific message

## Technology stacks
- [TypeScript](https://typescriptlang.org/) A strict syntactical superset of JavaScript, and adds optional static typing to the language.
- [Node js](https://nodejs.org/en/) is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Express js](http://expressjs.com/) handles backend routing.
- [Sequelize](http://docs.sequelizejs.com/) Sequelize is a promise-based ORM for Node.js and io.js. It supports the dialects PostgreSQL, MySQL, MariaDB, SQLite and MSSQL and features solid transaction support, relations and many more.
- [PostgreSQL](https://www.postgresql.org/) A powerful, open source object-relational database system.

## Installation
This installation guide for starting up the API

-   Install [Node js](https://nodejs.org/en/) and [Postgres](https://www.postgresql.org/) on your machine
-   Clone the repository `git clone https://github.com/johadi/sms-manager.git`
-   Change into the directory `cd sms-manager`
-   Install all required dependencies with `npm install`
-   For easier accessibility, Install sequelize-cli globally for database migrations `npm install -g sequelize-cli`
-   Create a `.env` file in your root directory and follow the pattern in the .env.sample file to create environmental variables
-   Migrate your database by running this command `sequelize db:migrate`
-   You can undo your migrations by running this command `sequelize db:migrate:undo:all`.
-   Open a terminal and run `npm run start` to start the api.
-   Navigate to `localhost:3000` on your postman or any other application for testing APIs

## Want to contribute ?
  * Fork the repository
  * Make your contributions
  * Make sure your work is well tested
  * Create Pull request against the **development** branch.

## License
MIT