module.exports = exports = {
  getInventory: getInventory,
  getFlowers: getFlowers,
  getFlowersQuery: getFlowersQuery
}

// establish db connection
var db = require('../config/db');

// =====================================
// GETINVENTORY ========================
// =====================================
// Get inventory from database.
function getInventory(callback) {
    var query = "SELECT i.*, t.type as 'inventoryType' " +
    "FROM inventory i " +
    "JOIN inventory_types t " +
    "ON i.type = t.id";
    db.query(query, function(err, rows) {
        if (err) {
             return callback(err, null);
        } else {
             return callback(null, rows);
        }
    });
}

function getFlowers(callback) {
  var query = "SELECT * " +
  "FROM inventory " +
  "WHERE type = 1 " +
  "ORDER BY name ASC";
  db.query(query, function(err, rows) {
    if (err) {
      return callback(err, null);
    } else {
      return callback(null, rows);
    }
  });
}
