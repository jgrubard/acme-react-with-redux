const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');
const { sync, seed } = db
const { User, Product } = db.models;

app.use(require('body-parser').json());

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/api/users', (req, res, next) => {
  User.findAll()
    .then(users => res.json(users))
    .catch(next);
})

app.post('/api/users', (req, res, next) => {
  User.create(req.body)
    .then(user => res.json(user))
    .catch(next);
})

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`** Listening on port ${port} **`));

sync()
  .then(() => seed());

