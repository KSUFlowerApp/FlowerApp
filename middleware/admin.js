module.exports = exports = {
  getInventoryTypes: getInventoryTypes,
  getMarkups: getMarkups,
  getUsers: getUsers,
  getRoles: getRoles,
  getTaxes: getTaxes,
  getFlowers: getFlowers,
  getHardGoods: getHardGoods
}

// establish db connection
var db = require('../config/db');

// =====================================
// GET INVENTORY TYPES ===============================
// =====================================
// Get inventory types from database.
function getInventoryTypes(callback) {
  var query = "SELECT * " +
  "FROM inventory_types";
  db.query(query, function(err, rows) {
      if (err) {
           return callback(err, null);
      } else {
           return callback(null, rows);
      }
  });
}


// =====================================
// GET MARKUPS ===============================
// =====================================
// Get markups from database.
function getMarkups(callback) {
  var query = "SELECT m.*, t.type as 'inventoryType' " +
  "FROM markups m " +
  "JOIN inventory_types t " +
  "ON m.type = t.id";
  console.log(query);
  db.query(query, function(err, rows) {
      if (err) {
           return callback(err, null);
      } else {
           return callback(null, rows);
      }
  });
}

function getFlowers(callback) {
  var query = "SELECT i.* " +
  "FROM inventory i " +
  "WHERE i.type = 1";
  db.query(query, function(err, rows) {
      if (err) {
           return callback(err, null);
      } else {
           return callback(null, rows);
      }
  });
}

function getHardGoods(callback) {
  var query = "SELECT i.* " +
  "FROM inventory i " +
  "WHERE i.type = 2";
  db.query(query, function(err, rows) {
      if (err) {
           return callback(err, null);
      } else {
           return callback(null, rows);
      }
  });
}

// =====================================
// GET USERS ===========================
// =====================================
// Get markups from database.
function getUsers(callback) {
  var query = "SELECT u.*, r.role as 'roleName' " +
  "FROM users u " +
  "JOIN roles r " +
  "ON u.role = r.id"
  db.query(query, function(err, rows) {
      if (err) {
           return callback(err, null);
      } else {
           return callback(null, rows);
      }
  });
}

// =====================================
// GET ROLES ===========================
// =====================================
// Get roles from database.
function getRoles(callback) {
  var query = "SELECT * " +
  "FROM roles";
  db.query(query, function(err, rows) {
      if (err) {
           return callback(err, null);
      } else {
           return callback(null, rows);
      }
  });
}

// =====================================
// GET TAXES ===============================
// =====================================
// Get taxes from database.
function getTaxes(callback) {
  var query = "SELECT * " +
  "FROM taxes " +
  "ORDER BY name ASC";
  db.query(query, function(err, rows) {
      if (err) {
           return callback(err, null);
      } else {
           return callback(null, rows);
      }
  });
}
