var expect = require('chai').expect;
var customers = require('../../middleware/customers.js');

describe("Middleware -- Customers Tests", function() {

  it("Test 1", function() {
    var x = 2 + 2;
    expect(x).to.equal(4);
  });

  it("Test 2", function() {
    var x = "abc";
    expect(x).to.equal("abc");
  });

  it("Get Customers", function() {
    var x = null;
    customers.getCustomers(function(err,rows) {
      expect(err).to.equal(null);
      expect(rows).to.not.equal(null);
      x = rows;
    });
    expect(x).to.not.equal(null);
  });

});
