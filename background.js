chrome.browserAction.onClicked.addListener(function(tab) {
    // chrome.browserAction.setPopup({});

    chrome.tabs.executeScript(tab.id, {
        file:"popup.js"
    });
    // Pretty up the CSS
    chrome.tabs.insertCSS(tab.id, {
        file: "awesome.css"
    });
    // Awesome up the negative number
    chrome.tabs.executeScript(tab.id, {
        file: "awesome.js"
    });
});