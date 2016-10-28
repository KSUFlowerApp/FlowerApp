// routes/staffRoutes.js

var session = require('../middleware/session.js');
var inventory = require('../middleware/inventory.js');

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
    // get Inventory table and pass it to ejs
    inventory.getInventory(function(err, inventory) {
      if(err) {
        res.render('staff/inventory.ejs', { inventory:undefined });
      } else {
        res.render('staff/inventory.ejs', { inventory:inventory });
      }
    });
  });

  // =====================================
  // STAFF - EVENT FORM =======================
  // =====================================
  app.get('/staff/eventForm', session.isLoggedIn, function(req,res) {
        res.render('staff/eventForm.ejs');
  });

  // =====================================
  // STAFF - EVENT FORM - POST =======================
  // =====================================
  app.post('/staff/eventForm', session.isLoggedIn, function(req,res) {
        console.log(req.body);
  });
};
