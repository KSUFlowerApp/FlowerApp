module.exports = exports = {
  getInventory: getInventory
}

// establish db connection
var db = require('../config/db');

// =====================================
// GETINVENTORY ===============================
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
