// Get the element
var target = document.getElementsByClassName('energy-remaining-number negative-energy');

while (target[0].textContent.indexOf("bonus") < 0) {
    // Slice the minus sign off the negative number (I don't know why, but there are 9 spaces before it!)
    var newNum = $(target).text().trim().slice(1);

    // Replaces the negative number with a positive
    $(target).text(newNum);
    $(target).append(" bonus points!");
} 