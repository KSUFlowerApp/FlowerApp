var expect = require('chai').expect;
var admin = require('../../middleware/events.js');

// Events
describe("Middleware - Events", function() {

  // Get events.
  it("- Get events", function() {
    var r = null;
    admin.getEvents(function(err, rows) {
      expect(err).to.equal(null);
      r = rows;
      expect(r).to.not.equal(null);
    });
  });
});
