const { Sequelize, _conn } = require('./conn.js');

const User = _conn.define('user', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
}, {
  timestamps: false
});

module.exports = User;
