// Get the extra calories text element
var number = document.getElementsByClassName('energy-remaining-number negative-energy');

// Slice the minus sign off the negative number (I don't know why, but there are 9 spaces before it!)
var newNum = $(number).text().trim().slice(1);

// Replaces the negative number with a positive
$(number).text(newNum);
$(number).append(" bonus points!");
