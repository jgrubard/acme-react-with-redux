const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');
const { sync, seed } = db
const { User, Product } = db.models;

app.use(require('body-parser').json());

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.use('/vendors', express.static(path.join(__dirname, 'node_modules')));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'))
});

app.use('/api/users', require('./routes/users.js'))

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`** Listening on port ${port} **`));

sync()
  .then(() => seed());
