var TEMP = document.getElementById("temp");
var TARGET = document.getElementById("target");
var CARD = TEMP.querySelector(".card");




class Card{
    constructor(num){
        this.id = num;
        this.suit = Math.floor(num/13);
        this.value = (num % 13) + 1;
        this.background = "bla.svg";
        this.suits = ["H","S","C","D"];
    }

    getSuitNumber(){
        return this.suit;
    }

    getSuit(){
        return this.suits[this.suit];
    }
    getValue(){
        return this.value;
    }

    draw(){
        var cardCopy = CARD.cloneNode(true);

        cardCopy.style.backgroundPositionX = (100/12 * (this.value -1)) + "%";
        cardCopy.style.backgroundPositionY = (100/3 * this.getSuit()) + "%";
    
        cardCopy.innerHTML = this.value;
        cardCopy.innerHTML += "-" + this.suits[this.suit];
        TARGET.append(cardCopy);
    }
}

var makeDeck = function(howMany){
    var deck = [];

    for(var i = 0; i < howMany; i ++){
        var card = new Card(i);
        deck.push(card);
    }

    return deck
}

var shuffledDeck = function(deck){
   
    for(var i = 0; i < deck.length; i ++){
        var rnd = Math.floor(Math.random()*deck.length);
        var tmp= deck[rnd];
        deck[rnd] = deck[i];
        deck[i] = tmp
    }

    return deck;
}

var DECK = makeDeck(52);
DECK = shuffledDeck(DECK);
console.log(DECK);
DECK[0].draw();