// routes/staffRoutes.js

var session = require('../middleware/session.js');

module.exports = function(app, passport, db) {
  // =====================================
  // STAFF ===============================
  // =====================================
  app.get('/staff', session.isLoggedIn, function(req,res) {
      res.render('staff.ejs');
  });

  // =====================================
  // STAFF - INVENTORY =======================
  // =====================================
  app.get('/staff/inventory', session.isLoggedIn, function(req,res) {
      res.render('staff/inventory.ejs');
  });
};
