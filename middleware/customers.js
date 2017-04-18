module.exports = exports = {
  getCustomers: getCustomers
}

// establish db connection
var db = require('../config/db');

// Get customers from database.
function getCustomers(callback) {
    var query = "SELECT c.* " +
    "FROM customers c " +
    "ORDER BY lastName ASC";
    db.query(query, function(err, rows) {
        if (err) {
             return callback(err, null);
        } else {
             return callback(null, rows);
        }
    });
}
