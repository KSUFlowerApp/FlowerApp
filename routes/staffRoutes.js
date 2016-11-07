// routes/staffRoutes.js

var session = require('../middleware/session.js');
var inventory = require('../middleware/inventory.js');
var customers = require('../middleware/customers.js');

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
    inventory.getInventory(function(err, inventory) {
      if(err) {
        res.render('staff/inventory.ejs', { inventory:undefined });
      } else {
        res.render('staff/inventory.ejs', { inventory:inventory });
      }
    });
  });

  app.get('/staff/customers', session.isLoggedIn, function(req,res) {
    customers.getCustomers(function(err, customers) {
      if(err) {
        res.render('staff/customers.ejs', { customers:undefined });
      } else {
        res.render('staff/customers.ejs', { customers:customers });
      }
    });
  });
};
