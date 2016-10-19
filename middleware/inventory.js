module.exports = exports = {
  getInventory: getInventory
}

// =====================================
// GETINVENTORY ===============================
// =====================================
// Get inventory from database.
function getInventory(req, res, next) {
    
    var query = "SELECT * " +
    "FROM inventory";
    
    console.log(query);
    db.query(query, function(err, rows) {
    
        if (err) {
             throw err;
        } else {
             console.log(rows);
             
             return rows;
        }
    });
}
