var expect = require('chai').expect;
var admin = require('../../middleware/admin.js');

describe("Middleware -- Admin Tests", function() {

  it("Get Inventory Types", function() {
    var inventoryTypes = null;
    admin.getInventoryTypes(function(err, rows) {
      expect(err).to.equal(null);
      inventoryTypes = rows;
    });
    expect(inventoryTypes).to.not.equal(null);
  });

});
