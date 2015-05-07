var urlUtils = require("./urlUtils");

exports["test that it returns an object if it matches the shortcut pattern"] = function(assert) {
    var result = urlUtils.getShortcutSuggestion("potentialShortcut potentialSearchvalue");
    assert.equal(result.shortcut, "potentialShortcut");
    assert.equal(result.searchValue, "potentialSearchvalue");
}

exports["test that it returns null if it does not match the shortcut pattern"] = function(assert) {
    var result = urlUtils.getShortcutSuggestion("http://someurlwithoutspaces.com");
    assert.equal(result, null);
}

require("sdk/test").run(exports);