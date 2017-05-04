var expect = require('chai').expect;
var admin = require('../../middleware/inventory.js');

// Events
describe("Middleware - Inventory", function() {

  // Get inventory.
  it("- Get inventory", function() {
    var r = null;
    admin.getInventory(function(err, rows) {
      expect(err).to.equal(null);
      r = rows;
      expect(r).to.not.equal(null);
    });
  });

  // Get flowers.
  it("- Get flowers", function() {
    var r = null;
    admin.getFlowers(function(err, rows) {
      expect(err).to.equal(null);
      r = rows;
      expect(r).to.not.equal(null);
    });
  });

  // Get flowers with markups.
  it("- Get flowers with markups", function() {
    var r = null;
    admin.getFlowersWithMarkups(function(err, rows) {
      expect(err).to.equal(null);
      r = rows;
      expect(r).to.not.equal(null);
    });
  });
});
