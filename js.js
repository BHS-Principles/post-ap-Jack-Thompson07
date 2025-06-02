
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
    {
        suit:"Clubs",
        value:4
    },
    {
        suit:"Diamonds",
        value:11
    },
    {
        suit:"Hearts",
        value:6
    },
    {
        suit:"Clubs",
        value:3
    },
    {
        suit:"Spades",
        value:2
    }
];

var TEMP = document.getElementById("temp");
var TARGET = document.getElementById("target");

var CARD = TEMP.querySelector(".card");

for(var i = 0; i < cards.length; i++){
    var currCard = cards[i];
    var cardCopy = CARD.cloneNode(true);

    cardCopy.style.backgroundPositionX = (100/12 * (currCard.value-1)) + "%";
    cardCopy.style.backgroundPositionY = (-100/3 * getSuitNumber(currCard.suit)) + "%";
    
    cardCopy.innerHTML = currCard.value;
    cardCopy.innerHTML += "-" + currCard.suit;

    TARGET.append(cardCopy);
}


var getSuitNumber = function(suit){
    if(suit == "Hearts") return 0;
    if(suit == "Diamonds") return 1;
    if(suit == "Clubs") return 2;
    return 3;
}