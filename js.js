var TEMP = document.getElementById("temp");
var TARGET = document.getElementById("target");
var CARD = TEMP.querySelector(".card");

class Game{
    constructor(){
        this.players = [];
        this.deck = new Deck(52);
        this.discard = new Deck(0);
        this.turn = 1;
    }

    start(){
        deck.shuffle();
        this.deal();
    }

    addPlayer(player){
        this.players.push(player);
    }

    deal(){
        for(i = 0; i < 7; i ++){
            for(j = 0; j < this.players.length; i ++){
                this.players[j].recieveCard(this.deck.deal());
            }
        }
    }
}

class Player{
    constructor(name){
        this.hand = [];
        this.wins = 0;
    }

    recieveCard(card){
        this.hand.push(card);
    }
}

class Card{
    constructor(num){
        this.id = num;
        this.suit = Math.floor(num/13);
        this.value = (num % 13) + 1;
        this.background = "bla.svg";
        this.suits = ["H","D","C","S"];
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
        cardCopy.style.backgroundPositionY = (100/3 * this.suit) + "%";
    
        cardCopy.innerHTML = this.value;
        cardCopy.innerHTML += "-" + this.suits[this.suit];
        TARGET.append(cardCopy);
    }
}

class Deck{
    constructor(size){
        this.cards = [];
        this.size = size;
        this.make(size)
    }

    make(howMany){
        for(var i = 0; i < howMany; i ++){
            var card = new Card(i);
            this.cards.push(card);
        }
    }

    shuffle(){
        for(var i = 0; i < this.cards.length; i ++){
            var rnd = Math.floor(Math.random()*this.cards.length);
            var tmp= this.cards[rnd];
            this.cards[rnd] = this.cards[i];
            this.cards[i] = tmp
        }
    }

    getCardAt(index){
        return this.cards[index];
    }

    deal(){
        var card = this.cards[0];
        this.cards.remove(0);
       return card;
    }
}
