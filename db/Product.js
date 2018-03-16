const { Sequelize, _conn } = require('./conn.js');

const Product = _conn.define('product', {
  name: Sequelize.STRING
}, {
  timestamps: false
});

module.exports = Product;
