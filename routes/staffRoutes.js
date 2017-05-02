// routes/staffRoutes.js

var session = require('../middleware/session.js');
var inventory = require('../middleware/inventory.js');
var customers = require('../middleware/customers.js');
var admin = require('../middleware/admin.js');
var events = require('../middleware/events.js');
var async = require('async');
var SqlString = require('sqlstring');
var moment = require('moment');

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

  // STAFF EVENT FORM GET CUSTOMER DROPDOWN
  app.get('/staff/eventForm/getCustomers/:id', session.isLoggedIn, function(req, res) {
    var selected_id = req.params.id;
    customers.getCustomers(function(err, _customers){
      if(err) {
        console.log(err);
        return res.sendStatus(500);
      }
      options = "";
      if(selected_id == "TBA") {
        options += "<option value=\"TBA\" selected=\"selected\">--</option>";
      } else {
        options += "<option value=\"TBA\">--</option>";
      }
      _customers.forEach(function(item, index) {
        if(item.id == selected_id) {
          options += "<option value=\"" + item.id + "\" selected=\"selected\">"+ item.lastName + ", " + item.firstName + "</option>"
        } else {
          options += "<option value=\"" + item.id + "\">"+ item.lastName + ", " + item.firstName + "</option>"
        }
      });
      res.send(options);
    });
  });

  // STAFF EVENT FORM GET CUSTOMER DROPDOWN
  app.get('/staff/eventForm/getTaxes/:id', session.isLoggedIn, function(req, res) {
    var selected_id = req.params.id;
    admin.getTaxes(function(err, _taxes) {
      if(err) {
        console.log(err);
        return res.sendStatus(500);
      }
      options = "";
      if(selected_id == "TBA") {
        options += "<option data-val=\"0\" value=\"TBA\" selected=\"selected\">--</option>";
      } else {
        options += "<option data-val=\"0\" value=\"TBA\">--</option>";
      }
      _taxes.forEach(function(item, index) {
        var item_rate = item.rate/100;
        if(item.id != selected_id) {
          options += "<option data-val=\""+item_rate+"\" value=\"" + item.id + "\">"+ item.name + " (" + item.rate + "%)</option>"
        } else {
          options += "<option data-val=\""+item_rate+"\" value=\"" + item.id + "\" selected=\"selected\">"+ item.name + " (" + item.rate + "%)</option>"
        }
      });
      res.send(options);
    });
  });

  // STAFF EVENT FORM GET CUSTOMER DROPDOWN
  app.get('/staff/eventForm/getInventory/:id', session.isLoggedIn, function(req, res) {
    var data = {}
    // get event and generate pdf
    async.parallel([
      (callback) => { inventory.getInventoryByType(req.params.id, callback) }
    ], function(err, _inventory) {
        if(err) {
          console.log(err)
        } else {
          var prices = {}
          var options = "<option value=''>Select...</option>";
          var inventory = _inventory[0];
          inventory.forEach(function(item, index) {
            options += "<option value=" + item.id + ">" + item.name + "</option>";
            prices[item.name] = item.price*item.markup;
          });
          data["options"] = options;
          data["prices"] = prices;
        }
        res.send(data);
      });
    });
  // =====================================
  // STAFF - EVENT FORM =======================
  // =====================================
  app.get('/staff/eventForm', session.isLoggedIn, function(req,res) {
    async.parallel([
      inventory.getInventoryTypes,
    ], function(err, results) {
      if(err) {
        console.log(err)
      } else {
        res.render('staff/eventForm.ejs', {inventory_types: results[0], form_id: undefined, form_html: undefined });
      }
    });
  });

  app.get('/staff/eventForm/:form_id', session.isLoggedIn, function(req,res) {
    async.parallel([
      inventory.getInventoryTypes,
      (callback) => { events.getEvent(req.params.form_id, callback) }
    ], function(err, results) {
      if(err) {
        console.log(err)
      } else {
        res.render('staff/eventForm.ejs', {inventory_types: results[0], form_id: results[1][0].id, form_html: results[1][0].form_html });
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
    var form_html = req.body.form_html;
    var form_json = req.body.form_json;
    var query = "";
    if(form_id) {
      query = SqlString.format("UPDATE events " +
              "SET customer = ?, brides_name = ?, grooms_name = ?, ceremony_date = ?, form_html = ?, form_json = ? " +
              "WHERE id = ?",[customer, brides_name, grooms_name, ceremony_date, form_html, form_json, form_id]);
    } else {
      query = SqlString.format("INSERT INTO events(customer, brides_name, grooms_name, ceremony_date, form_html, form_json) " +
							"VALUES(?, ?, ?, ?, ?, ?)",[customer, brides_name, grooms_name, ceremony_date, form_html, form_json]);
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
        res.render('staff/events.ejs', { events:events, moment: moment });
      }
    });
  });

  // =====================================
  // STAFF - EVENTS - PDF =======================
  // =====================================
  app.get('/staff/events/PDF/:id', session.isLoggedIn, function(req,res) {
    // get event and generate pdf
    async.parallel([
      (callback) => { events.getEvent(req.params.id, callback) }
    ], function(err, results) {
      if(err) {
        console.log(err)
      } else {
        var form_json = JSON.parse(results[0][0].form_json);
        var customer_id = form_json.customer_id;
        customers.getCustomer(customer_id, function(err2, customer_results) {
          if(err2) {
            console.log(err2);
          } else {
            form_json.customer = customer_results[0];
            res.render('staff/pdfs.ejs', { pdf: form_json });
          }
        });
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
