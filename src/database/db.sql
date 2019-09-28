  
CREATE DATABASE db_events;

USE db_events;

-- TABLE USER
-- all pasword wil be encrypted using SHA1
CREATE TABLE users (
  id INT(11) NOT NULL,
  username VARCHAR(16) NOT NULL,
  password VARCHAR(60) NOT NULL,
  fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users
  ADD PRIMARY KEY (id);

ALTER TABLE users
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE users;

INSERT INTO users (id, username, password, fullname) 
  VALUES (1, 'john', 'password1', 'John Carter');

SELECT * FROM users;

-- events TABLE
CREATE TABLE events (
  id INT(11) NOT NULL,
  nombre VARCHAR(150) NOT NULL,
  categoria VARCHAR(255) NOT NULL,
  lugar TEXT,
  user_id INT(11),
  direccion VARCHAR(255),
  startdate timestamp NOT NULL,
  endate timestamp NOT NULL DEFAULT current_timestamp,
  tipo BOOLEAN,
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);

ALTER TABLE events
  ADD PRIMARY KEY (id);

ALTER TABLE events
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE events;