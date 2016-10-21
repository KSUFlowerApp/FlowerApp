// routes/adminRoutes.js

var session = require('../middleware/session.js');
var inventory = require('../middleware/inventory.js');

module.exports = function(app, passport, db) {
  // =====================================
	// ADMIN ===============================
	// =====================================
	app.get('/admin', session.isLoggedIn, function(req,res) {
		if(req.app.locals.user.role != 1) {
			res.redirect('/404');
		} else {
			res.render('admin.ejs');
		}
	});

	// =====================================
	// ADMIN - USERS =======================
	// =====================================
	app.get('/admin/users', session.isLoggedIn, session.isAdmin, function(req,res) {
			res.render('admin/users.ejs');
	});

	// =====================================
	// ADMIN - INVENTORY =======================
	// =====================================
	app.get('/admin/inventory', session.isLoggedIn, session.isAdmin, function(req,res) {
		// get Inventory table and pass it to ejs
    inventory.getInventory(function(err, inventory) {
      if(err) {
        res.render('admin/inventory.ejs', { inventory:undefined });
      } else {
        res.render('admin/inventory.ejs', { inventory:inventory });
      }
    });
	});

	// =====================================
	// ADMIN - INVENTORY TYPES =======================
	// =====================================
	app.get('/admin/inventoryTypes', session.isLoggedIn, session.isAdmin, function(req,res) {
			res.render('admin/inventoryTypes.ejs');
	});

	// =====================================
	// ADMIN - MARKUPS =======================
	// =====================================
	app.get('/admin/markups', session.isLoggedIn, session.isAdmin, function(req,res) {
			res.render('admin/markups.ejs');
	});
};
