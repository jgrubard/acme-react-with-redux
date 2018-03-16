const Sequelize = require('sequelize');
const _conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_react_with_redux_db');

module.exports = { Sequelize, _conn };
