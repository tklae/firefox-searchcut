var shortcutToUrlMappings = {};
shortcutToUrlMappings['m'] = 'http://maps.google.com/maps?q=%q'
shortcutToUrlMappings['y'] = 'http://www.youtube.com/results?search_query=%q'

function getUrlFor(shortcut, searchValue) {
    console.log(1 + shortcut);
    if (shortcut in shortcutToUrlMappings) {
        console.log(1);
        var pageUrl = shortcutToUrlMappings[shortcut];
        var completeUrl = pageUrl.replace(/%q/g, encodeURIComponent(searchValue));
        return completeUrl;
    }
    return null;
}

exports.getUrlFor = getUrlFor;