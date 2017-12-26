const Sequelize = require('sequelize');

const database = new Sequelize('sqlite:database-sqlite.db');

database.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = database;
