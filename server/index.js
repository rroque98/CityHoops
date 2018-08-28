const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database-mysql');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
bodyParser.json();
app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/users', function (req, res) {
  db.selectAllUsers(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.get('/games', function (req, res) {
  db.selectAllGames(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.get('/specificGame', function (req, res) {
  db.selectSpecificGame(req.body.gameId, function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.post('/joinGame', function (req, res) {
  db.joinGame(req.body, function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

