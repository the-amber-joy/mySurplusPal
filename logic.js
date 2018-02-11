// Get the element
var target = document.getElementsByClassName('energy-remaining-number negative-energy');

// Trigger message to manipulate the DOM if untouched, or set popup if already changed
if (target[0].textContent.indexOf("bonus points") < 0) {
    chrome.runtime.sendMessage({message: "awesome it up"});
} 
else if (target[0].textContent.indexOf("bonus points") > -1) {
    chrome.runtime.sendMessage({message: "set popup"});   
}