var expect = require('chai').expect;
var customers = require('../../middleware/customers.js');

// Customers.
describe("Middleware - Customers", function() {

  // Get customers.
  it("- Get customers", function() {
    var r = null;
    customers.getCustomers(function(err, rows) {
      expect(err).to.equal(null);
      r = rows;
      expect(r).to.not.equal(null);
    });
  });
});
