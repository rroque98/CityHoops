const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../database-mysql');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/../react-client/dist')));

app.get('/users', (req, res) => {
  db.selectAllUsers((err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.get('/games', (req, res) => {
  db.selectAllGames((err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.get('/specificGame', (req, res) => {
  db.selectSpecificGame(req.body.gameId, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.post('/joinGame', (req, res) => {
  db.joinGame(req.body, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.listen(3000, () => {
  console.log('listening on port 3000!');
});
