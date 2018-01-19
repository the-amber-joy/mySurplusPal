var buttonDisabled = false;

chrome.browserAction.onClicked.addListener(function(tab) {
    if (buttonDisabled == false) {
        // Pretty up the CSS
        chrome.tabs.insertCSS(tab.id, {
            file: "awesome.css"
        });
        // Awesome up the negative number
        chrome.tabs.executeScript(tab.id, {
            file: "awesome.js"
        }, function() {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
            }
        });
        // Disable the button - it should only work once!
        buttonDisabled = true;
    } else {
        return;
    }
});
