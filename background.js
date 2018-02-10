// This makes sure the newly assigned popup from below doesn't hijack the click listener event
chrome.runtime.onMessage.addListener(function(request, sender) {
    if(request.popupOpen) {
        chrome.browserAction.setPopup({popup: ""});
    }
});

// On click, check the status of the page and determind which action to take
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(tab.id, {
        file: "logic.js"
    });

    chrome.runtime.onMessage.addListener(
        function(request) {
            chrome.tabs.insertCSS(tab.id, {
                file: "awesome.css"
            });
            chrome.tabs.executeScript(tab.id, {
                file: "awesome.js"
            });

            if (request.message == "set popup"){
                chrome.browserAction.setPopup({popup: "popup.html"});
            }
        });
});