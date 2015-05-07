var shortcutDefinitions = {};

function getDefinitionByShortcut(shortcut) {
    for (var key in shortcutDefinitions) {
        if (!shortcutDefinitions.hasOwnProperty(key)) {
            //The current property is not a direct property of p
            continue;
        }
        var currentDefinition = shortcutDefinitions[key];
        if (currentDefinition.shortcut === shortcut) {
            return currentDefinition;
        }
    }
    return null;
}

function getUrlFor(shortcut, searchValue) {
    var shortcutDefinition = getDefinitionByShortcut(shortcut);
    if (shortcutDefinition) {
        var baseUrl = shortcutDefinition.url;
        var completeUrl = baseUrl.replace(/%q/g, encodeURIComponent(searchValue));
        return completeUrl;
    }
    return null;
}

function addShortcut(id, name, shortcut, url) {
    var value = {
        id: id,
        name: name,
        shortcut: shortcut,
        url: url
    };
    shortcutDefinitions[id] = value;
}

function addShortcutFromPreferenceString(id, string) {
    var result = string.split(",");
    if (result.length != 3) {
        log.error("Can't parse ", string);
    }
    else {
        addShortcut(id, result[0], result[1], result[2]);
    }
}

exports.getUrlFor = getUrlFor;
exports.addShortcut = addShortcut;
exports.addShortcutFromPreferenceString = addShortcutFromPreferenceString;