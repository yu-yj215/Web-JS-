CREATE DATABASE studycaffe;

USE studycaffe;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    remaining_minutes INT
);

CREATE TABLE seats (
    seatnumber INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    remaining_minutes INT
);

INSERT INTO seats (username, remaining_minutes) values (NULL, NULL);
INSERT INTO seats (username, remaining_minutes, seatnumber) values (NULL, NULL, 1);

