    // Get the extra calories text element
    var number = document.getElementsByClassName('energy-remaining-number negative-energy');

    // Slice the minus sign off the negative number
    var newNum = $(number).text().slice(10);

    // Replaces the negative number with a positive
    $(number).text(newNum);
    $(number).append("bonus points");
