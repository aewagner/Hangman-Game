

//Create Word Bank
const wordBank = {
    w1: "Finn",
    w2: "Jake",
    w3: "Princess Bubblegum",
    w4: "Marceline the Vampire Queen",
    w5: "BMO",
    w6: "Lemongrab",
    w7: "Ice King",
    w8: "Magic Man",
    w9: "Prismo",
    w10: "The Lich"
}

let wins = 0;
let losses = 0;
let guessesLeft = 0;
let lettersGuessed = [];
let currentWord = "";
let splitArr = [];
let dashArr = [];
let displayWord = "";
let wordArray = [wordBank.w1, wordBank.w2, wordBank.w3, wordBank.w4, wordBank.w5, wordBank.w6, wordBank.w7, wordBank.w8, wordBank.w9, wordBank.w10];

//Game setup
console.log("currentWord", currentWord);
function renderGame() {
    // Set a random word    
    currentWord = wordArray[Math.floor(Math.random() * 10)]
    console.log("currentWord", currentWord);

    lettersGuessed = [];
    console.log("lettersGuessed", lettersGuessed);

    guessesLeft = currentWord.length + 5;
    console.log("guessesLeft", guessesLeft);

    splitArr = currentWord.toLowerCase().split('');
    console.log("splitArr", splitArr);

    // Check the length of word and render dashes
    // Check for spaces
    splitArr.map(index => {
        if (index === " ") {
            dashArr.push(index);
        }

        else {
            dashArr.push(' - ');
        }
    })

    console.log("dashArr", dashArr);

    displayWord = dashArr.join('');

    console.log("displayWord", displayWord);


}




//Create event listener
document.onkeyup = function (event) {

    // Captures the key press, converts it to lowercase, and saves it to a variable.
    let letter = String.fromCharCode(event.keyCode).toLowerCase();
    console.log(letter);
    console.log("splitArr after event", splitArr);

    if (/[a-z]/.test(letter)) {
        //Check for letter
        // if (splitArr.indexOf(letter)) {
        console.log("TRUE");
        for (let i = 0; i < splitArr.length; i++) {
            if (splitArr[i] === letter) {
                dashArr.splice(i, 1, letter);
            }
        }
        // } 

        if (dashArr.indexOf(' - ') === -1) {
            console.log("Yay! You win");
            wins++;
            renderGame();
        }

        if (splitArr.indexOf(letter) === -1 && lettersGuessed.indexOf(letter) === -1) {
            console.log("False")
            guessesLeft--;
            lettersGuessed.push(letter);

            if (guessesLeft === 0) {
                console.log("You lose");
                losses--;
                renderGame();
            }


        }

        console.log()

        // if (splitArr.indexOf(letter)) {
        //   dashArr.splice()
        // } else {

        // }

        console.log("dashArr after guess:", dashArr);
        console.log("Guesses Left:", guessesLeft);
        console.log("Letters Guessed:", lettersGuessed);

    }
}




//

renderGame();