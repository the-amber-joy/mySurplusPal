// Get the element
var target = document.getElementsByClassName('energy-remaining-number negative-energy');

while (target[0].textContent.indexOf("bonus") < 0) {
    // Trim excess whitespace and slice the minus sign off the negative number
    var newNum = $(target).text().trim().slice(1);

    // Replace the negative number with a positive, add text
    $(target).text(newNum);
    $(target).append(" bonus points!");
} 