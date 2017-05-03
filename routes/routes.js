// routes/routes.js

var session = require('../middleware/session.js');

module.exports = function(app, passport, db) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', session.isLoggedIn, function(req, res) {
		res.render('staff.ejs');
	});

	// home
	app.get('/home', session.isLoggedIn, function(req, res) {
		res.render('home.ejs');
	});

	// 404
	app.get('/404', session.isLoggedIn, function(req, res) {
		res.render('404.ejs');
	});

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', session.isLoggedIn, function(req, res) {
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
	app.get('/signup', session.isLoggedIn, function(req, res) {
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
	// LOGOUT ===============================
	// =====================================
	// once logged out, redirected to login page
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/login');
	});
};
