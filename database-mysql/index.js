const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'ballers'
});

const selectAllUsers = function(callback) {
  const query = `SELECT * FROM users INNER JOIN users_basketballgames ON (users_basketballgames.users_id = users.id)`;
  connection.query(query, (err, results) => {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const selectSpecificGame = function(bBallGameId, callback) {
  const query = `SELECT * FROM users INNER JOIN basketballgames ON users.bbgame_id = basketballgames.id WHERE basketballgames.id = ${bBallGameId}`;
  connection.query(query, function(err, results) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const selectAllGames = function(callback) {
  const query = `SELECT * FROM basketballgames`;
  connection.query(query, function(err, results) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const joinGame = (data, callback) => {
  const query = `INSERT INTO users_basketballgames (users_id, basketballgames_id) VALUES ('${Number(data.user_id)}', '${Number(data.basketballgame_id)}')`;
  connection.query(query, function(err, results) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports.selectAllUsers = selectAllUsers;
module.exports.selectAllGames = selectAllGames;
module.exports.selectSpecificGame = selectSpecificGame;
module.exports.joinGame = joinGame;
module.exports.connection = connection;
