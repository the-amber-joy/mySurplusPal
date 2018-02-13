  ///////////////////////////////////////////
 ///// VARIABLE & FUNCTION DEFINITIONS /////
///////////////////////////////////////////

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

    if (popupOpen.true){
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
    return new Promise(function(resolve, reject){
      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, function(tabs) {
        resolve(tabs[0]);
      });
    });
}

var logCurrentTab = function() {
    getCurrentTab().then(function(tab){
    console.log("onActivated:", tab.url);
  })
}

var logUpdatedUrl = function(tabId, changeInfo, tab) {
    if (changeInfo.url !== undefined) {
       console.log("onUpdated:", changeInfo.url);
    }
}

var disablePopupAfterOpening = function(request) {
    if(request.popupOpen) {
        chrome.browserAction.setPopup({popup: ""});
    }
}

  /////////////////////////////////////
 ///// BROWSER & RUNTIME ACTIONS /////
/////////////////////////////////////

// If browser window goes out of focus and back in, 'chrome.tabs' can't get CURRENT tab
// this requires an action to find current window, current tab
// console.log("window tabs:", chrome.windows.Window());
// chrome.windows.Window(tabs) {
//     console.log(tabs);
// } 
// will return an array of tabs in the currently focused window

// Getting the current URL so we know whether the button should be active or inactive
chrome.tabs.onUpdated.addListener(logUpdatedUrl); 
chrome.tabs.onActivated.addListener(logCurrentTab);


// On click, check the status of the page and determine which action to take
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(tab.id, {
        file: "logic.js"
    });
    chrome.runtime.onMessage.addListener(awesomeItUp);
    chrome.runtime.onMessage.addListener(setPopupAgain);
});

// This makes sure the newly assigned popup doesn't hijack the click listener event
// The automatic disabling prevents the popup from remaining the default click action on subsequent page visits within a short time
chrome.runtime.onMessage.addListener(disablePopupAfterOpening);