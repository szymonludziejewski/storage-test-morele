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
  const jsonString = JSON.stringify(request.body);
  for (let i=0; i < 10000; i++) {
    const id = (new Date()).getTime();
    database.addRawData(jsonString);
  }
  response.json(database.getDatabaseSize());
});

app.listen(environment.PORT, () => {
  console.log(`Server running on port ${environment.PORT}`);
});
