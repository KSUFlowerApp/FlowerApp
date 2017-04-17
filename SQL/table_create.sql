CREATE TABLE proj_flowerapp.roles (
  id       INT NOT NULL AUTO_INCREMENT,
  role     VARCHAR(45) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE proj_flowerapp.users (
  id           INT NOT NULL AUTO_INCREMENT,
  username     VARCHAR(45) NOT NULL,
  password     VARCHAR(256) NOT NULL,
  salt         VARCHAR(16)  NOT NULL,
  firstName    VARCHAR(45) NOT NULL,
  lastName     VARCHAR(45) NOT NULL,
  role         INT NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(role) REFERENCES proj_flowerapp.roles(id)
);

CREATE TABLE proj_flowerapp.inventory_types (
  id     INT NOT NULL AUTO_INCREMENT,
  type   VARCHAR(45) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE proj_flowerapp.markups (
  id      INT NOT NULL AUTO_INCREMENT,
  type    INT NOT NULL,
  markup  DECIMAL(3,2),
  PRIMARY KEY(id),
  FOREIGN KEY(type) REFERENCES proj_flowerapp.inventory_types(id)
);

CREATE TABLE proj_flowerapp.inventory (
  id     INT NOT NULL AUTO_INCREMENT,
  name   VARCHAR(45) NOT NULL,
  price  DECIMAL(5,2) NOT NULL,
  type  INT NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(type) REFERENCES proj_flowerapp.inventory_types(id)
);

CREATE TABLE proj_flowerapp.events (
  id                     INT NOT NULL AUTO_INCREMENT,
  customer               INT NOT NULL,
  brides_name            VARCHAR(45),
  grooms_name            VARCHAR(45),
  ceremony_date          DATETIME,
  form                   LONGTEXT,
  PRIMARY KEY(id),
  FOREIGN KEY(customer) REFERENCES proj_flowerapp.customers(id)
);

CREATE TABLE proj_flowerapp.taxes (
  id                     INT NOT NULL AUTO_INCREMENT,
  name                   VARCHAR(45) NOT NULL,
  rate                   DECIMAL(5,5) NOT NULL,
  PRIMARY KEY(id)
);
