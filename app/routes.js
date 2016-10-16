// app/routes.js
module.exports = function(app, passport) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', isLoggedIn, function(req, res) {
		res.render('profile.ejs');
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

	// Admin
	app.get('/admin', isLoggedIn, function(req,res) {
		if(req.app.locals.user.role != 1) {
			res.redirect('/404');
		} else {
			res.render('admin.ejs');
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
            successRedirect : '/profile', // redirect to the secure profile section
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
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// PROFILE ===============================
	// =====================================
	// pass isLoggedIn function to make sure a user is logged in
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs');
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
