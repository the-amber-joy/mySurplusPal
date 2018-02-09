console.log('hello world')

var target = document.getElementsByClassName('energy-remaining-number negative-energy');

while (target[0].textContent.indexOf("bonus") > -1) {
    chrome.browserAction.setPopup({"popup": "popup.html"});
}