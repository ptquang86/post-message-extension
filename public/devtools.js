function createDevToolsPanel() {
    chrome.devtools.panels.create("Post Message",
        null,
        "index.html",
        function (panel) {
            // code invoked on panel creation
        }
    );
}

createDevToolsPanel();
