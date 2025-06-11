var TEMP = document.getElementById("temp");
var TARGET = document.getElementById("target");
var CARD = TEMP.querySelector(".card");

class Game{
    constructor(){
        this.players = [];
        this.deck = new Deck(52);
        this.discard = new Deck(0);
        this.turn = 1;e
        this.currentPlayer = 0;
        this.currentCard = null;
    }

    //starts the game by shuffleing the deck and dealing cards
    start(){
        deck.shuffle();
        this.deal();
        this.currentCard = newCard();
    }

    //adds a new player to the game
    addPlayer(player){
        this.players.push(player);
    }

    //Deals out num cards to all players in the game
    deal(num){
        for(var i = 0; i < num; i ++){
            for(j = 0; j < this.players.length; i ++){
                recieveCard(this.deck.deal(this.players[j]));
            }
        }
    }

    getCurrentPlayer(){
        return this.players[this.currentPlayer];
    }

    newCard(){
        return this.deck.deal();
    }

    nextTurn(){
        currentPlayer ++;
        if(currentPlayer > this.players.length() - 1){
            this.currentPlayer = 0;
            this.turn ++;
        }
    }

    getPlayers(){
        return this.players;
    }

    play(){
        while(!(gameOver())){
            if(canPlayCard()){
                while(!(this.canPlayCard(this.currentPlayer.playCard())));
            }
            else{
                this.currentPlayer.recieveCard(this.deck.deal());
            }
        }
    }

    canPlayCard(){
        var hand = this.currentPlayer.getHand();
        for(var i = 0; i < hand.length; i ++){
            if((hand[i].getSuit == this.currentCard.getSuit()) || 
                (hand[i].getValue == this.currentCard.getValue()) ||
                hand[i].getValue > 10){
                return true;
            }
        }
        return false;
    }

    canPlayCard(card){
        var hand = this.currentPlayer.getHand();
        return ((hand[i].getSuit == this.currentCard.getSuit()) || 
                (hand[i].getValue == this.currentCard.getValue()) ||
                 hand[i].getValue > 10);
    }

    gameOver(){
        for(var i = 0; i < this.players.length; i ++){
            if(this.players[i].getHand().length == 0)
                return true;
        }
        return false;
    }
}

class Player{
    constructor(name){
        this.hand = [];
        this.wins = 0;
        this.name = name;
    }

    //player adds the given card to their hand
    recieveCard(card){
        this.hand.push(card);
    }

    getHand(){
        return this.hand;
    }

    playCard(){
        returnHang(0)
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

    //gets the suit index number
    getSuitNumber(){
        return this.suit;
    }

    //gets the actual character of the suit
    getSuit(){
        return this.suits[this.suit];
    }

    //gets the value of the card (1-13. 11 - Jack. 12 - Queen. 13 - King)
    getValue(){
        return this.value;
    }

    //displays the card on the screen
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

    //makes a list of cards (The deck) with the size as how many cards
    make(howMany){
        for(var i = 0; i < howMany; i ++){
            var card = new Card(i);
            this.cards.push(card);
        }
    }

    //suffles the deck by randomly interchanging cards in the deck
    shuffle(){
        for(var i = 0; i < this.cards.length; i ++){
            var rnd = Math.floor(Math.random()*this.cards.length);
            var tmp= this.cards[rnd];
            this.cards[rnd] = this.cards[i];
            this.cards[i] = tmp
        }
    }

    //returns the card at the specified index
    getCardAt(index){
        return this.cards[index];
    }

    //takes the top card from the deck, removes it, then returns it and displays it
    deal(player){
        var card = this.cards[0];
        this.cards.remove(0);
        card.draw();
        player.recieveCard(card);
    }
}

var game = new Uno();
var Jack = new Player(Jack);

var card = new Card(1);
card.draw();

game.addPlayer(Jack);
game.play();