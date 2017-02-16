CREATE TABLE proj_flowerapp.roles (
  id     INT NOT NULL AUTO_INCREMENT,
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
  brides_name            VARCHAR(45),
  grooms_name            VARCHAR(45),
  colors                 VARCHAR(250),
  theme                  VARCHAR(250),
  photographers          VARCHAR(45),
  photography_start_time DATETIME,
  wedding_planner        VARCHAR(45),
  delivery_time          DATETIME
  PRIMARY KEY(id)
);

CREATE TABLE proj_flowerapp.event_ceremony (
  id                  INT NOT NULL AUTO_INCREMENT,
  event_id            INT,
  ceremony_date       DATETIME,
  start_time          DATETIME,
  address             VARCHAR(100),
  city                VARCHAR(45),
  state               VARCHAR(2),
  zip                 VARCHAR(10),
  PRIMARY KEY(id),
  FOREIGN KEY(event_id) REFERENCES proj_flowerapp.events(id)
);

CREATE TABLE proj_flowerapp.event_reception (
  id                  INT NOT NULL AUTO_INCREMENT,
  event_id            INT,
  reception_date      DATETIME,
  start_time          DATETIME,
  address             VARCHAR(100),
  city                VARCHAR(45),
  state               VARCHAR(2),
  zip                 VARCHAR(10),
  PRIMARY KEY(id),
  FOREIGN KEY(event_id) REFERENCES proj_flowerapp.events(id)
);

CREATE TABLE proj_flowerapp.event_recipes (
  id       INT NOT NULL AUTO_INCREMENT,
  event_id INT,
  name     VARCHAR(45),
  qty      INT,
  price    DECIMAL(3,2),
  PRIMARY KEY(id),
  FOREIGN KEY(event_id) REFERENCES proj_flowerapp.events(id)
);

CREATE TABLE proj_flowerapp.recipe_items (
  id           INT NOT NULL AUTO_INCREMENT,
  recipe_id    INT,
  inventory_id INT,
  qty          INT,
  PRIMARY KEY(id),
  FOREIGN KEY(recipe_id) REFERENCES proj_flowerapp.events(id),
  FOREIGN KEY(flower_id) REFERENCES proj_flowerapp.inventory(id)
);
