var searchEngines = require("./shortcutRepository");

exports["test that it returns null for undefined shortcut"] = function(assert) {
    assert.equal(searchEngines.getUrlFor("somethingNotDefined", "anyValue"), null);
}

exports["test that a shortcut can be added"] = function(assert) {
    searchEngines.addShortcut("someId", "someName", "myShortcut", "urlWithPlaceholder%q")
    assert.equal(searchEngines.getUrlFor("myShortcut", "Filled"), "urlWithPlaceholderFilled");
}

exports["test that a shortcut can be added from string description"] = function(assert) {
    searchEngines.addShortcutFromPreferenceString("someId", "name,someShortcut,urlWithPlaceholder%q")
    assert.equal(searchEngines.getUrlFor("someShortcut", "Filled"), "urlWithPlaceholderFilled");
}

exports["test that a shortcut can be modified from string description if the id is the same"] = function(assert) {
    searchEngines.addShortcutFromPreferenceString("someId", "name,someShortcut,urlWithPlaceholder%q")
    searchEngines.addShortcutFromPreferenceString("someId", "name,anotherShortcut,anotherUrlWithPlaceholder%q")
    assert.equal(searchEngines.getUrlFor("someShortcut", "Filled"), null);
    assert.equal(searchEngines.getUrlFor("anotherShortcut", "Filled"), "anotherUrlWithPlaceholderFilled");
}

require("sdk/test").run(exports);