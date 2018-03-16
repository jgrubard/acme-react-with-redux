const { Sequelize, _conn } = require('./conn.js');

const User = _conn.define('user', {
  name: Sequelize.STRING
}, {
  timestamps: false
});

module.exports = User;
