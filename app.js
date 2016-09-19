var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'ejs');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));

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

app.post('/login', urlencodedParser, function(req,res) {
	res.send(req.body);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
