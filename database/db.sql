  
CREATE DATABASE db_agro;

USE db_agro;

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

-- agro TABLE
CREATE TABLE agro (
  id INT(11) NOT NULL,
  product_name VARCHAR(150) NOT NULL,
  product_description VARCHAR(255) NOT NULL,
  product_location VARCHAR(200),
  quantity INT (10),
  product_category VARCHAR(50),
  initial_value INT (15),
  user_id INT(11),
  startdate timestamp NOT NULL,
  endate timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);

ALTER TABLE agro
  ADD PRIMARY KEY (id);

ALTER TABLE agro
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE agro;