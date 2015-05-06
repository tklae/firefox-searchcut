var searchEngines = require("./searchEngines");

exports["test that it returns null for undefined shortcut"] = function(assert) {
    assert.equal(searchEngines.getUrlFor("somethingNotDefined", "anyValue"), null);
}

exports["test that a shortcut can be added"] = function(assert) {
    searchEngines.addShortcut("NameOfTheBestSearchEngine", "myShortcut", "urlWithPlaceholder%q")
    assert.equal(searchEngines.getUrlFor("myShortcut", "Filled"), "urlWithPlaceholderFilled");
}

require("sdk/test").run(exports);