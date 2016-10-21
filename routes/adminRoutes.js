// routes/adminRoutes.js

var session = require('../middleware/session.js');

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
	app.get('/admin/users', session.isLoggedIn, function(req,res) {
		if(req.app.locals.user.role != 1) {
			res.redirect('/404');
		} else {
			res.render('admin/users.ejs');
		}
	});

	// =====================================
	// ADMIN - INVENTORY =======================
	// =====================================
	app.get('/admin/inventory', session.isLoggedIn, function(req,res) {
		if(req.app.locals.user.role != 1) {
			res.redirect('/404');
		} else {

			res.render('admin/inventory.ejs');
		}
	});

	// =====================================
	// ADMIN - INVENTORY TYPES =======================
	// =====================================
	app.get('/admin/inventoryTypes', session.isLoggedIn, function(req,res) {
		if(req.app.locals.user.role != 1) {
			res.redirect('/404');
		} else {
			res.render('admin/inventoryTypes.ejs');
		}
	});

	// =====================================
	// ADMIN - MARKUPS =======================
	// =====================================
	app.get('/admin/markups', session.isLoggedIn, function(req,res) {
		if(req.app.locals.user.role != 1) {
			res.redirect('/404');
		} else {
			res.render('admin/markups.ejs');
		}
	});
};
