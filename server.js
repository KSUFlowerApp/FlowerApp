// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var app      = express();
var port     = process.env.PORT || 3000;
var passport = require('passport');
var flash    = require('connect-flash');
var mysql = require('mysql');

// configuration ===============================================================
// connect to our database
var db = require('./config/db');
require('./config/passport')(passport, db); // pass passport for configuration

// use static files
app.use('/public', express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
/*app.use('/admin', express.static(__dirname + '/public'));
app.use('/user', express.static(__dirname + '/public'));
app.use('/staff', express.static(__dirname + '/public'));*/

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
	secret: 'vidyapathaisalwaysrunning',
	resave: true,
	saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// routes ======================================================================
require('./routes/routes.js')(app, passport, db); // load general routes (login, logout, etc)
require('./routes/adminRoutes.js')(app, passport, db); // load admin routes
require('./routes/staffRoutes.js')(app, passport, db); // load staff routes
require('./routes/userRoutes.js')(app, passport, db); // load user routes

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
