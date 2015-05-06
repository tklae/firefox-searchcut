var shortcutToUrlMappings = {};
shortcutToUrlMappings['m'] = 'http://maps.google.com/maps?q=%q'
shortcutToUrlMappings['y'] = 'http://www.youtube.com/results?search_query=%q'

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

exports.getUrlFor = getUrlFor;
exports.addShortcut = addShortcut;