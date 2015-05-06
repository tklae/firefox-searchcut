var shortcutToUrlMappings = {};

function getUrlFor(shortcut, searchValue) {
    if (shortcut in shortcutToUrlMappings) {
        var pageUrl = shortcutToUrlMappings[shortcut];
        var completeUrl = pageUrl.replace(/%q/g, encodeURIComponent(searchValue));
        return completeUrl;
    }
    return null;
}

function addShortcut(name, shortcut, url) {
    shortcutToUrlMappings[shortcut] = url;
}

function addShortcutFromPreferenceString(string) {
    var result = string.split(",");
    if (result.length != 3) {
        log.error("Can't parse ", string);
    }
    else {
        addShortcut(result[0], result[1], result[2]);
    }
}

exports.getUrlFor = getUrlFor;
exports.addShortcut = addShortcut;
exports.addShortcutFromPreferenceString = addShortcutFromPreferenceString;