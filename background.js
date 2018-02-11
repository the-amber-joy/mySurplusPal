var awesomeItUp = function(request) {
    if (request.message == "awesome it up"){
        console.log("making page awesome");
        chrome.tabs.insertCSS({
            file: "awesome.css"
        });
        chrome.tabs.executeScript({
            file: "awesome.js"
        });
        console.log("popup being set");
        chrome.browserAction.setPopup({popup: "popup.html"});
    }

    if (popupOpen.true){
        console.log("popup being reset");
        chrome.browserAction.setPopup({popup: ""});
    }
}

// this is the problematic one
// incrementally larger batches of actions
var setPopupAgain = function(request) {
    if (request.message == "set popup"){
        console.log("popup being set again");
        chrome.browserAction.setPopup({popup: "popup.html"});
        chrome.runtime.onMessage.removeListener(setPopupAgain);
    }
}

// On click, check the status of the page and determind which action to take
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(tab.id, {
        file: "logic.js"
    });

    chrome.runtime.onMessage.addListener(awesomeItUp);
    chrome.runtime.onMessage.addListener(setPopupAgain);
});

// This makes sure the newly assigned popup doesn't hijack the click listener event
chrome.runtime.onMessage.addListener(function(request, sender) {
    if(request.popupOpen) {
        chrome.browserAction.setPopup({popup: ""});
        console.log("popup has been reset");
    }
});