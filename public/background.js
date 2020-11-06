/*global chrome*/

var connections = {};

/*
 * app <- content-script.js <- **background.js** <- dev tools
 */
chrome.runtime.onConnect.addListener(function (port) {
    var extensionListener = function (message, sender, sendResponse) {
        // Register initial connection
        if (message.name === 'init') {
            connections[message.tabId] = port;
            return;
        }

        // Otherwise, broadcast to app
        chrome.tabs.sendMessage(message.tabId, {
            name: message.name,
            data: message.data
        });
    }

    // Listen to messages sent from the DevTools page
    port.onMessage.addListener(extensionListener);

    port.onDisconnect.addListener(function (port) {
        port.onMessage.removeListener(extensionListener);

        var tabs = Object.keys(connections);
        for (var i = 0, len = tabs.length; i < len; i++) {
            if (connections[tabs[i]] == port) {
                delete connections[tabs[i]]
                break;
            }
        }
    });

});

/*
 * app -> content-script.js -> **background.js** -> dev tools
 */
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (sender.tab) {
        var tabId = sender.tab.id;
        if (tabId in connections) {
            connections[tabId].postMessage(message);
        } else {
            console.log("Tab not found in connection list.");
        }
    } else {
        console.log("sender.tab not defined.");
    }
    return true;
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (tabId in connections && changeInfo.status === 'complete') {
        // TODO: reload connection to page somehow...?
        connections[tabId].postMessage({
            name: 'reloaded'
        });
    }
});
