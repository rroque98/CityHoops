var faker = require('faker');
const mysql = require('./database-mysql');

let users = [];
let possibleLevels = ['Rookie', 'Intermediate', 'Veteran'];

// Math.floor(Math.random() * (max - min)) + min
// Math.floor(Math.random() * (max - min + 1)) + min
let games = [];
let possibleMinutes = ['15', '30', '45', '00'];
let amPm = ['am', 'pm'];
for (let i = 0; i < 5; i++) {
  let game = {};
  game.location = faker.address.streetAddress();
  game.day = faker.date.future();
  let possibleHours = Math.floor(Math.random() * (12)) + 1;
  let amOrPm = amPm[Math.floor(Math.random() * (2))];
  game.start_time = `${possibleHours}:${possibleMinutes[Math.floor(Math.random() * (possibleMinutes.length))]} ${amOrPm}`;
  game.end_time = `${possibleHours + 1}:${possibleMinutes[Math.floor(Math.random() * (possibleMinutes.length))]} ${amOrPm}`;
  games.push(game);
  mysql.connection.query(`INSERT INTO basketballgames (location, day, start_time, end_time) VALUES ('${game.location}', '${game.day}', '${game.start_time}', '${game.end_time}')`, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.log('game successfully inserted!');
    }
  });
}

for (let i = 0; i < 20; i++) {
  let user = {};
  user.name = faker.fake("{{name.firstName}} {{name.lastName}}");
  user.image = `https://s3-us-west-1.amazonaws.com/airfecuserimages/randPeopleImages/randPerson${i + 15}.jpg`;
  user.level = possibleLevels[Math.floor(Math.random() * (possibleLevels.length))];
  users.push(user);
  mysql.connection.query(`INSERT INTO users (name, image, level) VALUES('${user.name}', '${user.image}', '${user.level}')`, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.log('user successfully inserted!');
    }
  });
}


for (let i = 1; i <= 20; i++) {
  const randomGameId = Math.floor(Math.random() * (5)) + 1;
  const query = `INSERT INTO users_basketballgames (users_id, basketballgames_id) VALUES ('${i}', '${randomGameId}')`;
    mysql.connection.query(query, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.log('user-basketball row successfully inserted!');
    }
  });
}

const insertMe = () => {
  const picLink = 'https://s3-us-west-1.amazonaws.com/airfecuserimages/pic/FB_IMG_1535446710487.jpg'
  const query = `INSERT INTO users (name, image, level) VALUES ('Ricky', '${picLink}', 'Intermediate')`;
  mysql.connection.query(query, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.log('I am in!');
    }
  });
}

insertMe();
