/*global chrome*/

/*
 * app -> **content-script.js** -> background.js -> dev tools
 */
window.addEventListener('message', function (event) {
    // Only accept messages from same frame
    if (event.source !== window) {
        return;
    }

    var message = event.data;

    // Only accept messages of correct format (our messages)
    if (typeof message !== 'object' || message === null || !message.gdc
        // message.source !== 'coquette-inspect-agent'
    ) {
        return;
    }

    chrome.runtime.sendMessage(message);
});


/*
 * app <- **content-script.js** <- background.js <- dev tools
 */
chrome.runtime.onMessage.addListener(function (request) {
    window.postMessage(request.data, '*');
});
