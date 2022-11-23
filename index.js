require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const database = require('./simple-database/database');

const environment = process.env;
const app = express();

app.use(bodyParser.json())

app.get('/', (_request, response) => {
  response.json(database.getDatabaseSize());
});

app.post('/', (request, response) => {
  for (let i=0; i < 100; i++) {
    const id = (new Date()).getTime();
    database.addData('data', id, request.body);
  }
  response.json(database.getDatabaseSize());
});

app.listen(environment.PORT, () => {
  console.log(`Server running on port ${environment.PORT}`);
});
