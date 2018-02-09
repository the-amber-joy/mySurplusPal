chrome.browserAction.onClicked.addListener(function(tab) {
    // Pretty up the CSS
    chrome.tabs.insertCSS(tab.id, {
        file: "awesome.css"
    });
    // Awesome up the negative number
    chrome.tabs.executeScript(tab.id, {
        file: "awesome.js"
    });
});