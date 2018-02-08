var clickCounter = 0;

chrome.tabs.onUpdated.addListener(function (tab){
    clickCounter = 0;
});

chrome.browserAction.onClicked.addListener(function(tab) {
    if (clickCounter < 2) {
        // Pretty up the CSS
        chrome.tabs.insertCSS(tab.id, {
            file: "awesome.css"
        });
        // Awesome up the negative number
        chrome.tabs.executeScript(tab.id, {
            file: "awesome.js"
        });
        clickCounter++;
    }
});


