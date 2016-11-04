// routes/adminRoutes.js

var session = require('../middleware/session.js');
var inventory = require('../middleware/inventory.js');
var admin = require('../middleware/admin.js');

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
		// get Users table and pass it to ejs
		admin.getUsers(function(err, users) {
			if(err) {
				res.render('admin/users.ejs', { users:undefined });
			} else {
				res.render('admin/users.ejs', { users:users });
			}
		});
	});

	// =====================================
	// ADMIN - INVENTORY ===================
	// =====================================
	app.get('/admin/inventory', session.isLoggedIn, session.isAdmin, function(req,res) {
		// get Inventory table and pass it to ejs
    inventory.getInventory(function(err, inventory) {
      if(err) {
				admin.getInventoryTypes(function(err, inventoryTypes) {
					if(err) {
						res.render('admin/inventory.ejs', { inventory:undefined, inventoryTypes:undefined });
					} else {
						res.render('admin/inventory.ejs', { inventory:undefined, inventoryTypes:inventoryTypes });
					}
				});
      } else {
				admin.getInventoryTypes(function(err, inventoryTypes) {
					if(err) {
						res.render('admin/inventory.ejs', { inventory:inventory, inventoryTypes:undefined });
					} else {
						res.render('admin/inventory.ejs', { inventory:inventory, inventoryTypes:inventoryTypes });
					}
				});
      }
    });
	});

	// =====================================
	// ADMIN - INVENTORY TYPES =============
	// =====================================
	app.get('/admin/inventoryTypes', session.isLoggedIn, session.isAdmin, function(req,res) {
		// get Inventory Types table and pass it to ejs
		admin.getInventoryTypes(function(err, inventoryTypes) {
			if(err) {
				res.render('admin/inventoryTypes.ejs', { inventoryTypes:undefined });
			} else {
				res.render('admin/inventoryTypes.ejs', { inventoryTypes:inventoryTypes });
			}
		});
	});

	// =====================================
	// ADMIN - MARKUPS =====================
	// =====================================
	app.get('/admin/markups', session.isLoggedIn, session.isAdmin, function(req,res) {
		// get Markups table and pass it to ejs
		admin.getMarkups(function(err, markups) {
			if(err) {
				res.render('admin/markups.ejs', { markups:undefined });
			} else {
				res.render('admin/markups.ejs', { markups:markups });
			}
		});
	});
};
