var main = require("./main");

exports["test main - default test left in for reference"] = function(assert) {
  assert.pass("Unit test running!");
};

exports["test main async - default test left in for reference"] = function(assert, done) {
  assert.pass("async Unit test running!");
  done();
};

require("sdk/test").run(exports);
