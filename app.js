var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mysql = require('mysql');

// Init App
var app = express();

/*
use your own login credentials for sql connection
*/
var connection = mysql.createConnection({
  host     : 'mysql.cis.ksu.edu',
  user     : 'projusr_flower',
  password : 'rosesarenotredKSU',
  database : 'proj_flowerapp'
});

connection.connect(function(err) {
  if(!err) {
    console.log("Database is connected");
  } else {
    console.log("Error connecting to database");
  }
});

app.set('db',connection);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
