DROP DATABASE IF EXISTS ballers;

CREATE DATABASE ballers;

USE ballers;

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(500) NOT NULL,
  image varchar(1000),
  level varchar(50),
  PRIMARY KEY (id)
);

CREATE TABLE basketballgames (
  id int NOT NULL AUTO_INCREMENT,
  location varchar(255) NOT NULL,
  day varchar(255) NOT NULL,
  start_time varchar(50) NOT NULL,
  end_time varchar(50) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE users_basketballgames (
  id int NOT NULL AUTO_INCREMENT,
  users_id integer NOT NULL,
  basketballgames_id integer NOT NULL,
  PRIMARY KEY (id)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
