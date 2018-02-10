var target = document.getElementsByClassName('energy-remaining-number negative-energy');

if (target[0].textContent.indexOf("bonus points") < 0) {
    chrome.runtime.sendMessage({message: "awesome it up"});
} 
else if (target[0].textContent.indexOf("bonus points") > -1) {
    chrome.runtime.sendMessage({message: "set popup"});
}