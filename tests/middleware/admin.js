var expect = require('chai').expect;
var admin = require('../../middleware/admin.js');

// Admin.
describe("Middleware - Admin", function() {

  // Get inventory types.
  it("- Get inventory types", function() {
    var r = null;
    admin.getInventoryTypes(function(err, rows) {
      expect(err).to.equal(null);
      r = rows;
      expect(r).to.not.equal(null);
    });
  });

  // Get markups.
  it("- Get markups", function() {
    var r = null;
    admin.getMarkups(function(err, rows) {
      expect(err).to.equal(null);
      r = rows;
      expect(r).to.not.equal(null);
    });
  });
});
