module.exports = exports = {
  getInventoryTypes: getInventoryTypes,
  getMarkups: getMarkups,
  getUsers: getUsers
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


// =====================================
// GET USERS ===============================
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
