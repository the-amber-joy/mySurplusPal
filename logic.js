var target = document.getElementsByClassName('energy-remaining-number negative-energy');

if (target[0].textContent.indexOf("bonus points") < 0) {
    console.log("let's awesome it up")
    chrome.runtime.sendMessage({message: "awesome it up"});
} 
else if (target[0].textContent.indexOf("bonus points") > -1) {
    console.log("let's set the popup")
    chrome.runtime.sendMessage({message: "set popup"});
    
}