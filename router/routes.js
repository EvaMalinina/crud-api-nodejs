const express = require('express');
const router = express.Router();
const secret = 'mysecretsshhh';
const withAuth = require('../middleware');

const User = require('../models/User');
const Note = require('../models/Note');
const jwt = require('jsonwebtoken');

router.get('/api/home', function(req, res) {
  res.send('Welcome!');
});

router.get('/api/register', function(req, res) {
  res.send('Write your email and create password, mate :))');
});

// POST route to register a user
router.post('/api/register', function(req, res) {
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

router.post('/api/authenticate', function(req, res) {
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

router.get('/checkToken', withAuth, function(req, res) {
  // const { token } = req.cookies.token; ??
  // if(token)  {
    res.sendStatus(200)
  // }
});

router.get('/api/login', function(req, res) {
  res.send('Fill to log in, mate :)');
});

router.get('/api/notes', function(req, res) {
  res.send('There is your notes, mate :)');
});

// POST route to add a note
router.post('/api/notes', function(req, res) {
  // res.send('Create login name and password, mate :))');
  const { label, done } = req.body;
  const note = new Note({ label, done });
  note.save(function(err) {
    if (err) {
      res.status(500)
        .send(err.message);
    } else {
      res.status(200).send("Note added!");
    }
  });
});

module.exports = router;