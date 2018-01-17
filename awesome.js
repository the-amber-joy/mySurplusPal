
var number = document.getElementsByClassName('energy-remaining-number negative-energy');
var newNum = $(number).text().slice(10);
$(number).text(newNum);
$(number).append("bonus points");
