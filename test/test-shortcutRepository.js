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

exports["test that whitespaces are stripped from string description"] = function(assert) {
    searchEngines.addShortcutFromPreferenceString(" whiteSpaceId ", " whitespaceName , whitespaceShortcut , whitespaceUrl ")
    var shortcutDefinition = searchEngines.getById("whiteSpaceId");
    assert.equal(shortcutDefinition.name, "whitespaceName");
    assert.equal(shortcutDefinition.shortcut, "whitespaceShortcut");
    assert.equal(shortcutDefinition.url, "whitespaceUrl");
}

exports["test that a shortcut cannot be added from a malformed string description"] = function(assert) {
    searchEngines.addShortcutFromPreferenceString("idForMalformedStuff", "malformedStuff")
    assert.equal(searchEngines.getById("idForMalformedStuff"), null);
}

exports["test that a shortcut cannot be added from null id"] = function(assert) {
    searchEngines.addShortcutFromPreferenceString(null, "name,someShortcut,urlWithPlaceholder%q")
    assert.equal(searchEngines.getById(null), null);
}

exports["test that a shortcut can be modified from string description if the id is the same"] = function(assert) {
    searchEngines.addShortcutFromPreferenceString("someId", "name,someShortcut,urlWithPlaceholder%q")
    searchEngines.addShortcutFromPreferenceString("someId", "name,anotherShortcut,anotherUrlWithPlaceholder%q")
    assert.equal(searchEngines.getUrlFor("someShortcut", "Filled"), null);
    assert.equal(searchEngines.getUrlFor("anotherShortcut", "Filled"), "anotherUrlWithPlaceholderFilled");
}

require("sdk/test").run(exports);