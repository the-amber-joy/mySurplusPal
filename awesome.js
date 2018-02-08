// Get the element
var number = document.getElementsByClassName('energy-remaining-number negative-energy');
console.log("click!");

if (document.getElementsByClassName('energy-remaining-number negative-energy')[0].textContent.indexOf("bonus") < 0) {
    // Slice the minus sign off the negative number (I don't know why, but there are 9 spaces before it!)
    var newNum = $(number).text().trim().slice(1);

    // Replaces the negative number with a positive
    $(number).text(newNum);
    $(number).append(" bonus points!");
} else {
    alert("Awesome score! Have a great day tomorrow!");
}

