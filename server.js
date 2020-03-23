const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const mongo_uri = 'mongodb://localhost:27017/users';
const cookieParser = require('cookie-parser');
const cors = require('cors');

const routes = require('./router/routes');

app.use(cors())
app.use(bodyParser.json());
app.use(cookieParser());
app.use('', routes);


mongoose.connect(mongo_uri, { useNewUrlParser: true }, function(err) {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${mongo_uri}`);
  }
});

app.listen(8082, function () {
  console.log('CORS-enabled web server listening on port 8082')
})