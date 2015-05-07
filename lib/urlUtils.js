const regex = /(.+?)\s(.*)$/; //gets everything up to the first whitespace as $1 and everything after the first whitespace as $2

function getShortcutSuggestion(urlString) {
    var result = regex.exec(urlString);
    
    if (result !== null) {
        var potentialShortcut = result[1];
        var searchValue = result[2];
        
        return {
            shortcut: potentialShortcut,
            searchValue: searchValue
        }
    }
    return null;
}


exports.getShortcutSuggestion = getShortcutSuggestion;