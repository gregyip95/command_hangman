var Word = require('./word.js');
var prompt = require('prompt');

console.log("Welcome to Hangman!");
console.log("Guess a letter to decode the word!");
console.log("Go!");
console.log("-----------------------------");
prompt.start();



game = {
  wordBank: ['sports', 'foods', 'states', 'colors', 'cars', 'numbers', 'phones'],
    Wins: 0,
  guessesRemaining: 10,
  currentWrd: null,
  
  startGame: function (wrd) {
    this.resetGuesses();
    this.currentWrd = new Word(this.wordBank[Math.floor(Math.random()* this.wordBank.length)]);
    this.currentWrd.getLet();
    this.promptUser();
  },

  resetGuesses: function(){
    this.guessesRemaining = 10;
  },

  promptUser: function(){
    var self = this;
    prompt.get(['guessLetter'], function(err, result){
      console.log("You guessed: " + result.guessLet);
      var manyGuessed = self.currentWrd.checkLetter(result.guessLet);

      if(manyGuessed ==0) {
        console.log("WRONG");
        self.guessesRemaining--;
        
      } else {
        console.log("CORRECT");
          if(self.currentWrd.findWord()){
            console.log("You won!");
            console.log("-------------------");
            return;
          }
      }

      console.log("Guesses remaining: " + self.guessesRemaining);
      console.log("-------------------");
      if((self.guessesRemaining > 0) && (self.currentWrd.found == false)){
        self.promptUser();
      }
      else if(self.guessesRemaining ==0){
        console.log("Game over. Correct Word is", self.currentWrd.target);
      } else {
        console.log(self.currentWrd.wordRender());
      }
    });

  }


};

game.startGame();