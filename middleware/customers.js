module.exports = exports = {
  getCustomers: getCustomers
}

// establish db connection
var db = require('../config/db');

// =====================================
// GETINVENTORY ===============================
// =====================================
// Get inventory from database.
function getCustomers(callback) {
    var query = "SELECT c.* " +
    "FROM customers c ";
    db.query(query, function(err, rows) {
        if (err) {
             return callback(err, null);
        } else {
             return callback(null, rows);
        }
    });
}
