var expect = require('chai').expect;
var admin = require('../middleware/admin.js');

describe("Admin Middleware Tests", function() {
  it("Get Inventory Types", function() {
    var inventoryTypes = null;
    admin.getInventoryTypes(function(err, rows) {
      expect(err).to.equal(null);
      inventoryTypes = rows;
    });
    expect(inventoryTypes).to.not.equal(null);
  });
});
