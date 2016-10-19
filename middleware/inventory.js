module.exports = exports = {
  getInventory: getInventory
}

// establish db connection
var db = require('../config/db');

// =====================================
// GETINVENTORY ===============================
// =====================================
// Get inventory from database.
function getInventory() {
    var query = "SELECT * " +
    "FROM inventory";
    db.query(query, function(err, rows) {

        if (err) {
             throw err;
        } else {
             return JSON.stringify(rows);
        }
    });
}
