var preferences = require("sdk/simple-prefs").prefs;
var shortcutRepository = require("./shortcutRepository");


function onPrefChange(prefName) {
  shortcutRepository.addShortcutFromPreferenceString(prefName, preferences[prefName]);
}

function init() {
    for (var i = 0; i <= 15; i++) {
        var preferenceName = "shortcut" + i;
        var preferenceValue = preferences[preferenceName];
        if (preferenceValue) {
            shortcutRepository.addShortcutFromPreferenceString(preferenceName, preferenceValue);
        }
    }
    require("sdk/simple-prefs").on("", onPrefChange);
}

exports.init = init;