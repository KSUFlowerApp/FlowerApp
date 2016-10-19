module.exports = exports = {
  isLoggedIn: isLoggedIn
}

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
