chrome.runtime.onMessage.addListener(function(request, sender) {
    if(request.popupOpen) {
        chrome.browserAction.setPopup({popup: "popup.html"});
    }
});

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(tab.id, {
        file: "logic.js"
    });

    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            chrome.tabs.insertCSS(tab.id, {
                file: "awesome.css"
            });
            chrome.tabs.executeScript(tab.id, {
                file: "awesome.js"
            });

            if (request.message == "show popup"){
                chrome.browserAction.setPopup({popup: "popup.html"});
            }
        });

});