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
        console.log(string + " can't be parsed. Ignoring entry.");
    }
    else if (id === null) {
        console.log("Ignoring shortcut definition because the id is null ", string);
    }
    else {
        addShortcut(id, result[0], result[1], result[2]);
    }
}

function getById(id) {
    return shortcutDefinitions[id];
}

exports.getUrlFor = getUrlFor;
exports.addShortcut = addShortcut;
exports.addShortcutFromPreferenceString = addShortcutFromPreferenceString;
exports.getById = getById;