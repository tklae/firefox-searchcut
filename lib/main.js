const tabs = require("sdk/tabs");
const {viewFor} = require('sdk/view/core');
const {modelFor} = require('sdk/model/core');
const {getBrowserForTab, getTabForContentWindow} = require("sdk/tabs/utils");
const {Ci, Cu} = require("chrome");
Cu.import("resource://gre/modules/XPCOMUtils.jsm", this);

var preferences = require("sdk/simple-prefs").prefs;
var shortcutRepository = require("./shortcutRepository")
var regex = /(.+?)\s(.*)$/;

var progressListener = {
QueryInterface: XPCOMUtils.generateQI([Ci.nsIWebProgressListener, Ci.nsISupportsWeakReference]),
    onLocationChange: function(aProgress, aRequest, aStateFlags, aStatus) {
        var highlevelApiTab = modelFor(getTabForContentWindow(aProgress.DOMWindow));
        var window = aProgress.DOMWindow;
        var mainWindow = window.QueryInterface(Ci.nsIInterfaceRequestor)
                       .getInterface(Ci.nsIWebNavigation)
                       .QueryInterface(Ci.nsIDocShellTreeItem)
                       .rootTreeItem
                       .QueryInterface(Ci.nsIInterfaceRequestor)
                       .getInterface(Ci.nsIDOMWindow);
        var urlBarValue = mainWindow.gURLBar.value;
        console.log(mainWindow.gURLBar.value);
        var result = regex.exec(urlBarValue);
        console.log(result);
        
        if (result !== null) {
            var potentialShortcut = result[1];
            var searchValue = result[2];
            var targetUrl = shortcutRepository.getUrlFor(potentialShortcut, searchValue);
            if (targetUrl !== null) {
                console.log('Search key present in mappings, redirecting tab to ' + targetUrl)
                highlevelApiTab.url = targetUrl;
            }
            else {
                console.log('No search key found, continue to requested page');
            }
        }
    }
};

shortcutRepository.addShortcutFromPreferenceString("shortcut1", preferences.shortcut1);
shortcutRepository.addShortcutFromPreferenceString("shortcut2", preferences.shortcut2);

var addProgressListenerToTab = function(tab) {
    var lowLevelTab = viewFor(tab);
    var browser = getBrowserForTab(lowLevelTab);
    browser.addProgressListener(progressListener);
}

//Add progress listener to all existing tabs
for (let tab of tabs) {
    addProgressListenerToTab(tab);
}

//Add progress listener to all new tabs
tabs.on('open', addProgressListenerToTab);

