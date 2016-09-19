var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

app.set('view engine', 'ejs');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/home', function(req, res) {
  res.render('home');
});

app.post('/home', urlencodedParser, function(req,res) {
	res.send(req.body);
});

app.get('/login', function(req, res) {
  res.render('login');
});

app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/loginSuccess',
    failureRedirect: '/loginFailure'
  })
);

app.get('/loginFailure', function(req, res, next) {
  res.send('Failed to authenticate');
});

app.get('/loginSuccess', function(req, res, next) {
  res.send('Successfully authenticated');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
