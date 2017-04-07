module.exports = exports = {
  getEvents: getEvents
}

// establish db connection
var db = require('../config/db');

// =====================================
// GETEVENTS ========================
// =====================================
// Get events from database.
function getEvents(callback) {
    var query = "SELECT e.*, c.id AS customer_id, CONCAT(c.lastName, ', ', c.firstName) AS customer " +
                "FROM events e " +
                "JOIN customers c " +
                "ON e.customer = c.id"
    db.query(query, function(err, rows) {
        if (err) {
             return callback(err, null);
        } else {
             return callback(null, rows);
        }
    });
}
