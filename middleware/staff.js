module.exports = exports = {
  getCustomers: getCustomers
}

// establish db connection
var db = require('../config/db');

// =====================================
// GETCUSTOMERS ===============================
// =====================================
// Get customers from database.
function getCustomers(callback) {
    var query = "SELECT * FROM customers";
    db.query(query, function(err, rows) {
        if (err) {
             return callback(err, null);
        } else {
             return callback(null, rows);
        }
    });
}
