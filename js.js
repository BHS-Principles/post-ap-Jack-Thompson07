var TEMP = document.getElementById("temp");
var TARGET = document.getElementById("target");
var CARD = TEMP.querySelector(".card");

class Game{
    constructor(){
        this.players = [];
        this.deck = new Deck(52);
        this.discard = new Deck(0);
        this.turn = 1;
        this.currentPlayer = 0;
        this.currentCard = null;
    }

    //adds a new player to the game
    addPlayer(player){
        this.players.push(player);
    }

    getCurrentPlayer(){
        return this.players[this.currentPlayer];
    }

    start(){
        this.deck.shuffle();
        this.deal(3);
        this.currentCard = this.deck.deal();
        this.play();
    }

    //Deals out num cards to all players in the game
    deal(num){
        for(var i = 0; i < num; i ++){
            for(var j = 0; j < this.players.length; j ++){
                this.players[j].recieveCard(this.deck.deal());
            }
        }
    }

    nextTurn(){
        this.currentPlayer ++;
        if(this.currentPlayer > this.players.length - 1){
            this.currentPlayer = 0;
            this.turn ++;
        }
    }

    play(){
        while(!(this.gameOver())){
            this.doTurn();
            this.nextTurn();
        }

        var winner = this.checkWinner();
        winner.displayHand();
        alert("WINNER: " + winner.getName());
    }

    checkWinner(){
        for(var i = 0; i < this.players.length; i ++){
            if(this.players[i].getHand().length == 0){
                return this.players[i];
            }
        }
        
    }

    doTurn(){
        alert("CURRENT CARD \n Value:" + this.currentCard.getValue() + " Suit:" + this.currentCard.getSuit());
        var playedCard = this.getCurrentPlayer().playCard();
        if(this.canPlayCard(playedCard)){
            this.discard.addCard(this.currentCard);
            this.currentCard = playedCard;
            this.getCurrentPlayer().play(playedCard);
            alert("YOU PLAYED: Value:" + playedCard.getValue() + " Suit:" + playedCard.getSuit());
        }
        else{
            var drawCard = this.deck.deal()
            this.getCurrentPlayer().recieveCard(drawCard);
            alert("YOU CANNOT PLAY THAT CARD\nYOU REVIECED: Value:" + drawCard.getValue() + " Suit:" + drawCard.getSuit());
        }

    }

    canPlayCard(playedCard){
        return ((playedCard.getSuit() == this.currentCard.getSuit()) || 
                (playedCard.getValue() == this.currentCard.getValue()) ||
                (playedCard.getValue() > 10));
    }

    gameOver(){
        for(var i = 0; i < this.players.length; i ++){
            if(this.players[i].getHand().length == 0)
                return true;
        }
        return false;
    }
}

class BasicGame{
    constructor(){
        this.players = [];
        this.deck = new Deck(52);
        this.discard = new Deck(0);
        this.turn = 1;
        this.currentPlayer = 0;
    }


    //starts the game by shuffleing the deck and dealing cards
    start(){
        this.deck.shuffle();
        //this.deal();
        //this.currentCard = newCard();
        this.play();
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
        this.currentPlayer ++;
        if(this.currentPlayer > this.players.length - 1){
            this.currentPlayer = 0;
            this.turn ++;
        }
    }

    getPlayers(){
        return this.players;
    }

    play(){
        while(!(this.gameOver())){
            this.doTurn();
            this.nextTurn();
        }

        var winner = this.checkWinner();
        winner.displayHand();
        alert("WINNER: " + winner.getName());
    }

    gameOver(){
        if(this.turn > 1)
            return true;
        return false;
    }

    checkWinner(){
        var winner = this.players[0]
        for(var i = 1; i < this.players.length; i ++){
            if(winner.getHand()[0].getValue() < this.players[i].getHand()[0].getValue()){
                winner = this.players[i];
            }
        }
        return winner;
    }

    doTurn(){
        
        this.deck.deal(this.players[this.currentPlayer]);
    }

    /*
    doTurn(){
        if(canPlayCard()){
            while(!(this.canPlayCard(this.currentPlayer.playCard())));
        }
        else{
            this.currentPlayer.recieveCard(this.deck.deal());
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
    */
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
        card.draw();
    }

    getHand(){
        return this.hand;
    }

    playCard(){
        var text = this.name + "'s HAND\nWHAT CARD WOULD YOU LIKE TO PLAY\n";
        for(var i = 0; i < this.hand.length; i ++){
            text += (i + 1) + ") Value:" + this.hand[i].getValue() + " Suit:" + this.hand[i].getSuit() +"\n";
        }
        var input = prompt(text);
        return this.hand[parseInt(input) -1];
    }

    getName(){
        return this.name;
    }

    displayHand(){
        for(var i = 0; i < this.hand.length; i ++){
            this.hand[i].draw();
        }
    }

    play(card){
        for(var i = 0; i < this.hand.length; i ++){
            if(this.hand[i] == card){
                this.hand.splice(i,1);
            }
        }
    }
}

class Card{
    constructor(num){
        this.id = num;
        this.suit = Math.floor(num/13);
        this.value = (num % 13) + 1;
        this.background = "bla.svg";
        this.suits = ["Hearts","Diamonds","Clubs","Spades"];
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

    addCard(card){
        this.cards.push(card);
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
    deal(){
        var card = this.cards[0];
        this.cards.splice(0,1);
        return card;
    }

}

var game = new Game();
game.addPlayer(new Player("Player 1"));
game.addPlayer(new Player("Player 2"));
game.start();