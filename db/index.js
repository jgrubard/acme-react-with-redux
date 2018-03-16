const { _conn } = require('./conn.js');
const User = require('./User.js')
const Product = require('./Product.js')

const sync = () => {
  return _conn.sync({ force: true });
}

const seed = () => {
  return Promise.all([
    User.create({ name: 'Mario' }),
    User.create({ name: 'Luigi' }),
    User.create({ name: 'Bowser' }),
    Product.create({ name: 'Blue Shell' }),
    Product.create({ name: 'Red Shell' }),
    Product.create({ name: 'Green Shell' })
  ])
}

module.exports = {
  sync,
  seed,
  models: {
    User,
    Product
  }
}
