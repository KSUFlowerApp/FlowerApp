// app/routes.js
module.exports = function(app, passport, db) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', isLoggedIn, function(req, res) {
		res.render('staff.ejs');
	});

	// about page
	app.get('/about', isLoggedIn, function(req, res) {
			res.render('about.ejs');
	});

	// home
	app.get('/home', isLoggedIn, function(req, res) {
		res.render('home.ejs');
	});

	// 404
	app.get('/404', isLoggedIn, function(req, res) {
		res.render('404.ejs');
	});

	// =====================================
	// STAFF ===============================
	// =====================================
	app.get('/staff', isLoggedIn, function(req,res) {
			res.render('staff.ejs');
	});

	// =====================================
	// ADMIN - USERS =======================
	// =====================================
	app.get('/staff/inventory', isLoggedIn, function(req,res) {
			res.render('staff/inventory.ejs');
	});

	// =====================================
	// ADMIN ===============================
	// =====================================
	app.get('/admin', isLoggedIn, function(req,res) {
		if(req.app.locals.user.role != 1) {
			res.redirect('/404');
		} else {
			res.render('admin.ejs');
		}
	});

	// =====================================
	// ADMIN - USERS =======================
	// =====================================
	app.get('/admin/users', isLoggedIn, function(req,res) {
		if(req.app.locals.user.role != 1) {
			res.redirect('/404');
		} else {
			res.render('admin/users.ejs');
		}
	});

	// =====================================
	// ADMIN - INVENTORY =======================
	// =====================================
	app.get('/admin/inventory', isLoggedIn, function(req,res) {
		if(req.app.locals.user.role != 1) {
			res.redirect('/404');
		} else {

			res.render('admin/inventory.ejs');
		}
	});

	// =====================================
	// ADMIN - INVENTORY TYPES =======================
	// =====================================
	app.get('/admin/inventoryTypes', isLoggedIn, function(req,res) {
		if(req.app.locals.user.role != 1) {
			res.redirect('/404');
		} else {
			res.render('admin/inventoryTypes.ejs');
		}
	});

	// =====================================
	// ADMIN - MARKUPS =======================
	// =====================================
	app.get('/admin/markups', isLoggedIn, function(req,res) {
		if(req.app.locals.user.role != 1) {
			res.redirect('/404');
		} else {
			res.render('admin/markups.ejs');
		}
	});

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', isLoggedIn, function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('login.ejs', { message: req.flash('loginMessage')});
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/staff', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
		}),
        function(req, res) {
            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/');
    });


	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', isLoggedIn, function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', {message: req.flash('signupMessage')});
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/staff', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// USER = PROFILE ===============================
	// =====================================
	// pass isLoggedIn function to make sure a user is logged in
	/*app.get('/user/profile', isLoggedIn, function(req, res) {
		res.render('user/profile.ejs');
	});*/

	// =====================================
	// USER = SETTINGS ===============================
	// =====================================
	app.get('/user/settings', isLoggedIn, function(req, res) {
		res.render('user/settings.ejs', {message: req.flash('settingsMessage')});
	});

	// UPDATE PASSWORD
	app.post('/user/settings', isLoggedIn, function(req, res) {
		var currentPassword = req.body.currentPassword;
		var newPassword = req.body.newPassword;
		var confirmNewPassword = req.body.confirmNewPassword;

		var crypto = require('crypto');
		db.query("SELECT * FROM users WHERE username = '" + req.app.locals.user.username + "'", function(err, rows) {
			if(err) {
				throw err;
			} else {
				if(newPassword != confirmNewPassword) {
					req.flash('settingsMessage', 'Oops! Passwords do not match.'); // create the loginMessage and save it to session as flashdata
				} else if (!(rows[0].password == crypto.createHmac('sha256',rows[0].salt).update(currentPassword).digest('hex'))) {
					req.flash('settingsMessage', 'Oops! Wrong password.'); // create the loginMessage and save it to session as flashdata
				} else {
					newPassword = crypto.createHmac('sha256',rows[0].salt).update(newPassword).digest('hex');
					db.query("UPDATE users SET password='" + newPassword + "' WHERE id=" + req.app.locals.user.id, function(err2, rows2) {
						if(err2) {
							throw err2;
						}
					});
					req.flash('settingsMessage', 'Password updated successfully!');
				}
			}
			res.redirect('back');
		});
	});

	// =====================================
	// LOGOUT ===============================
	// =====================================
	// once logged out, redirected to login page
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/login');
	});
};

// =====================================
// ISLOGGEDIN ===============================
// =====================================
// route middleware to make sure that a user is logged in
function isLoggedIn(req, res, next) {

	// if user is logged in continue
	if (req.isAuthenticated()) {
		req.app.locals.user = req.user;
		return next();
	} else if(req.route.path != '/login' && req.route.path != '/signup') {
		// otherwise redirect to the login page if not going to login or signup
		req.app.locals.user = undefined;
		res.redirect('/login')
	} else {
		// set user to undefined because we are going to a login or signup page without being logged in
		req.app.locals.user = undefined;
		return next();
	}
}
