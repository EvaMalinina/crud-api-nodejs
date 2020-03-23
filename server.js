const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const mongo_uri = 'mongodb://localhost:27017/users';
const jwt = require('jsonwebtoken');
const cors = require('cors');

const User = require('./models/User');

const secret = 'mysecretsshhh';
const cookieParser = require('cookie-parser');
const withAuth = require('./middleware');

app.use(cors())
app.use(bodyParser.json());
app.use(cookieParser());


mongoose.connect(mongo_uri, { useNewUrlParser: true }, function(err) {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${mongo_uri}`);
  }
});

app.get('/api/home', function(req, res) {
  res.send('Welcome!');
});

app.get('/api/register', function(req, res) {
  res.send('Write your email and create password, mate :))');
});

// POST route to register a user
app.post('/api/register', function(req, res) {
  // res.send('Create login name and password, mate :))');
  const { email, password } = req.body;
  const user = new User({ email, password });
  user.save(function(err) {
    if (err) {
      res.status(500)
        .send(err.message);
    } else {
      res.status(200).send("Welcome to the club!");
    }
  });
});

app.post('/api/authenticate', function(req, res) {
  const { email, password } = req.body;
  User.findOne({ email }, function(err, user) {
    if (err) {
      console.error(err);
      res.status(500)
        .json({ error: 'Internal error please try again' });
    } else {
      user.isCorrectPassword(password, function(err, samePassword) {
       
        if (!samePassword) {
          res.status(401)
            .json({ error: 'Incorrect password' });
        } else {
          // Issue token
          const payload = { email };
          const token = jwt.sign(payload, secret, {
            expiresIn: '1h'
          });
          res.json({ token });
        }
      });
    }
  });
});

app.get('/checkToken', withAuth, function(req, res) {
  res.sendStatus(200);
});

app.get('/api/secret', withAuth, function(req, res) {
  res.send('The password is potato');
});

app.get('/api/login', function(req, res) {
  res.send('Fill to log in, mate :)');
});

app.get('/api/notes', function(req, res) {
  res.send('There is your notes, mate :)');
});

app.listen(8082, function () {
  console.log('CORS-enabled web server listening on port 8082')
})