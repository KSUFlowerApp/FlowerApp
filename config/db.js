var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'mysql.cis.ksu.edu',
    user: 'projusr_flower',
    password: 'rosesarenotredKSU',
    database: 'proj_flowerapp'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
