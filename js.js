
const { contentType } = require("express/lib/response");

var cards = [
    {
        suit:"Spades",
        value:4
    },
    {
        suit:"Hearts",
        value:7
    },
    {
        suit:"Diamonds",
        value:9
    },
    
];

var TEMP = document.getElementById("temp");
var TARGET = document.getElementById("target");

var CARD = TEMP.querySelector(".card");

for(var i = 0; i < cards.length; i++){
    var currCard = cards[i];
    var cardCopy = CARD.cloneNode(true);
    cardCopy.style.backgroundPositionX = (-100 * currCard.value) + "%";
    cardCopy.innerHTML = currCard.value;
    cardCopy.innerHTML += "-" + currCard.suit;

    TARGET.append(cardCopy);
}
