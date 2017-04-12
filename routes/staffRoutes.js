// routes/staffRoutes.js

var session = require('../middleware/session.js');
var inventory = require('../middleware/inventory.js');
var customers = require('../middleware/customers.js');
var events = require('../middleware/events.js');
var async = require('async');
var SqlString = require('sqlstring');

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
    // get Inventory table and pass it to ejs
    inventory.getInventory(function(err, inventory) {
      if(err) {
        console.log(err);
      } else {
        res.render('staff/inventory.ejs', { inventory:inventory });
      }
    });
  });

  // =====================================
  // STAFF - EVENT FORM =======================
  // =====================================
  app.get('/staff/eventForm', session.isLoggedIn, function(req,res) {
    async.parallel([
      inventory.getFlowersWithMarkups,
      customers.getCustomers,
    ], function(err, results) {
      if(err) {
        console.log(err)
      } else {
        res.render('staff/eventForm.ejs', {flowers: results[0], customers: results[1], form_id: undefined, form_text: undefined });
      }
    });
  });

  app.get('/staff/eventForm/:form_id', session.isLoggedIn, function(req,res) {
    console.log(req.params.form_id);
    async.parallel([
      inventory.getFlowersWithMarkups,
      customers.getCustomers,
      events.getEvent(req.params.form_id)
    ], function(err, results) {
      if(err) {
        console.log(err)
      } else {
        res.render('staff/eventForm.ejs', {flowers: results[0], customers: results[1], form_id: results[2][0].id, form_text: results[2][0].form });
      }
    });
  });

  // =====================================
  // STAFF - EVENT FORM - POST =======================
  // =====================================
  app.post('/staff/eventForm', session.isLoggedIn, function(req,res) {
    var form_id = req.body.form_id;
    var customer = req.body.customer;
    var brides_name = req.body.brides_name;
    var grooms_name = req.body.grooms_name;
    var ceremony_date = req.body.ceremony_date;
    var form_text = req.body.form_text;
    var query = "";
    if(form_id) {
      console.log("UPDATING");
      query = SqlString.format("UPDATE events " +
              "SET customer = ?, brides_name = ?, grooms_name = ?, ceremony_date = ?, form = ? " +
              "WHERE id = ?",[customer, brides_name, grooms_name, ceremony_date, form_text, form_id]);
    } else {
      console.log("INSERTING");
      query = SqlString.format("INSERT INTO events(customer, brides_name, grooms_name, ceremony_date, form) " +
							"VALUES(?, ?, ?, ?, ?)",[customer, brides_name, grooms_name, ceremony_date, form_text]);
    }
    db.query(query, function(err, rows) {
			var response = {
				status: 200,
				message: "Form saved successfully.",
        form_id: (form_id) ? form_id : rows.insertId
			}
			if(err) {
				response = {
					status: 500,
					message: "Error saving form.",
          form_id: (form_id) ? form_id : rows.insertId
				}
			}
			res.send(JSON.stringify(response));
		});
  });

  // =====================================
  // STAFF - EVENTS =======================
  // =====================================
  app.get('/staff/events', session.isLoggedIn, function(req,res) {
    // get events table and pass it to ejs
    events.getEvents(function(err, events) {
      if(err) {
        console.log(err);
      } else {
        res.render('staff/events.ejs', { events:events });
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
