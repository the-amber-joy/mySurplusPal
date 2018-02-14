  ///////////////////////////////////////////
 ///// VARIABLE & FUNCTION DEFINITIONS /////
///////////////////////////////////////////

var enableBasedOnLocation = function() {
    getCurrentTab().then(function(tab){
        if (tab.url !== "http://www.myfitnesspal.com/") {
            chrome.browserAction.disable(tab.id);
        } else if (tab.url == "http://www.myfitnesspal.com/") {
            chrome.browserAction.enable(tab.id);
        }   
    });
    getUpdatedTab();
}

// manipulate the DOM and enable the popup for any subsequent clicks
var awesomeItUp = function(request) {
    if (request.message == "awesome it up"){
        chrome.tabs.insertCSS({
            file: "awesome.css"
        });
        chrome.tabs.executeScript({
            file: "awesome.js"
        });
        chrome.browserAction.setPopup({popup: "popup.html"});
    }
}

var disablePopupAfterOpening = function(request) {
    if(request.popupOpen) {
        chrome.browserAction.setPopup({popup: ""});
    }
}

// If DOM has already been changed, set popup message
// This needs to be done because after the popup is displayed, it automatically disables itself
var setPopupAgain = function(request) {
    if (request.message == "set popup"){
        chrome.browserAction.setPopup({popup: "popup.html"});
        chrome.runtime.onMessage.removeListener(setPopupAgain);
    }
}

function getCurrentTab(){
    return new Promise(function(resolve){
      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, function(tabs) {
        resolve(tabs[0]);
      });
    });
}

function getUpdatedTab(tabId, changeInfo, tab) {
    if (changeInfo.url !== undefined) {
        if (changeInfo.url !== "http://www.myfitnesspal.com/") {
            chrome.browserAction.disable(tabId);
        } else if (changeInfo.url == "http://www.myfitnesspal.com/") {
            chrome.browserAction.enable(tabId)
        }
    } else { 
        return; 
    }
}

  ///////////////////////////
 ///// BROWSER ACTIONS /////
///////////////////////////

// Listen for current location, enable button only on MFP
chrome.tabs.onActivated.addListener(enableBasedOnLocation);

// On click, check the status of the page and determine which action to take
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(tab.id, {
        file: "logic.js"
    });
    chrome.runtime.onMessage.addListener(awesomeItUp);
    chrome.runtime.onMessage.addListener(setPopupAgain);
});

// This makes sure the newly assigned popup doesn't hijack the click listener event
// It prevents the popup from remaining the default click action on subsequent page visits within a short time
chrome.runtime.onMessage.addListener(function(request, sender) {
    if(request.popupOpen) {
        chrome.browserAction.setPopup({popup: ""});
    }
});