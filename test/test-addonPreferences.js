var addonPreferences = require("./addonPreferences");
var preferences = require("sdk/simple-prefs").prefs;
var shortcutRepository = require("./shortcutRepository");

exports["test that it adds shortcuts from preferences on startup"] = function(assert) {
    preferences.shortcut1 = "SomeName,SomeShortcut,SomeUrl";
    
    addonPreferences.init();
    
    var shortcutDefinition = shortcutRepository.getById("shortcut1");
    assert.equal(shortcutDefinition.name, "SomeName");
    assert.equal(shortcutDefinition.shortcut, "SomeShortcut");
    assert.equal(shortcutDefinition.url, "SomeUrl");
}

exports["test that it adds first 15 shortcuts from preferences on startup"] = function(assert) {
    preferences.shortcut15 = "Name15,Shortcut15,URL15";
    preferences.shortcut16 = "Name16,Shortcut16,URL16";
    
    addonPreferences.init();
    
    var shortcutDefinition = shortcutRepository.getById("shortcut15");
    assert.equal(shortcutDefinition.name, "Name15");
    assert.equal(shortcutDefinition.shortcut, "Shortcut15");
    assert.equal(shortcutDefinition.url, "URL15");
    
    assert.equal(shortcutRepository.getById("shortcut16"), null);
}


exports["test that it updates the definition in the repository on preferences changes"] = function(assert) {
    preferences.shortcut1 = "SomeName,SomeShortcut,SomeUrl";
    
    addonPreferences.init();
    
    preferences.shortcut1 = "ChangedName,ChangedShortcut,ChangedUrl";
    
    var shortcutDefinition = shortcutRepository.getById("shortcut1");
    assert.equal(shortcutDefinition.name, "ChangedName");
    assert.equal(shortcutDefinition.shortcut, "ChangedShortcut");
    assert.equal(shortcutDefinition.url, "ChangedUrl");
}

require("sdk/test").run(exports);