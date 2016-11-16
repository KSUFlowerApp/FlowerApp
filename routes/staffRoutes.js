// routes/staffRoutes.js

var session = require('../middleware/session.js');
var inventory = require('../middleware/inventory.js');
var customers = require('../middleware/customers.js');

module.exports = function(app, passport, db) {
  // =====================================
  // STAFF ===============================
  // =====================================
  app.get('/staff', session.isLoggedIn, function(req,res) {
      res.render('staff.ejs');
  });

  // =====================================
  // STAFF - INVENTORY =======================
  // =====================================
  app.get('/staff/inventory', session.isLoggedIn, function(req,res) {
    inventory.getInventory(function(err, inventory) {
      if(err) {
        res.render('staff/inventory.ejs', { inventory:undefined });
      } else {
        res.render('staff/inventory.ejs', { inventory:inventory });
      }
    });
  });

  // =====================================
  // STAFF - CUSTOMERS =======================
  // =====================================
  app.get('/staff/customers', session.isLoggedIn, function(req,res) {
    customers.getCustomers(function(err, customers) {
      if(err) {
        res.render('staff/customers.ejs', { customers:undefined });
      } else {
        res.render('staff/customers.ejs', { customers:customers });
      }
    });
  });

  app.post('/staff/customers', function(req, res) {
		var id = req.body.customerID;
		var firstName = undefined;
		var lastName = undefined;
		var phone = undefined;
    var email = undefined;
    var addr = undefined;
    var city = undefined;
    var state = undefined;
		var query = undefined;

    console.log(id);
		if (typeof id === 'undefined' || !id) {
			var firstName = req.body.addFirstName;
      var lastName = req.body.addLastName;
      var phone = req.body.addPhone;
      var email = req.body.addEmail;
      var addr = req.body.addAddr;
      var city = req.body.addCity;
      var state = req.body.addState;
      var zip = req.body.addZip;
			query = "INSERT INTO customers(firstName, lastName, phone, e_mail, street_addr, city, state, zip) " +
							"VALUES('"+firstName+"', '"+lastName+"', '"+phone+"', '"+email+"', '"+addr+"', '"+city+"', '"+state+"', '"+zip+"')";
		}
		else {
      var firstName = req.body.customerFirstName;
      var lastName = req.body.customerLastName;
      var phone = req.body.customerPhone;
      var email = req.body.customerEmail;
      var addr = req.body.customerStreetAddr;
      var city = req.body.customerCity;
      var state = req.body.customerState;
      var zip = req.body.customerZip;
			query = "UPDATE customers " +
							"SET firstName = '"+firstName+"', " +
							"lastName = '"+lastName+"', " +
              "phone = '"+phone+"', " +
              "e_mail = '"+email+"', " +
              "street_addr = '"+addr+"', " +
              "city = '"+city+"', " +
              "state = '"+state+"', " +
              "zip = '"+zip+"' " +
							"WHERE id = "+id;
		}
    console.log(query + " " + id);
		db.query(query, function(err, rows) {
			var response = {
				status: 200,
				message: "Customer info updated successfully."
			}
			if(err) {
				response = {
					status: 500,
					message: "Error updating customer info."
				}
			}
			res.end(JSON.stringify(response));
		});
	});
};
