

//Create Word Bank
const wordBank = {
    w1: ["Finn", "./assets/images/finn.png"],
    w2: ["Jake", "./assets/images/jake.png"],
    w3: ["Princess Bubblegum", "./assets/images/pbg.png"],
    w4: ["Marceline the Vampire Queen", "./assets/images/marceline.png"],
    w5: ["BMO", "./assets/images/bmo.png"],
    w6: ["Lemongrab", "./assets/images/lemongrab.png"],
    w7: ["Ice King", "./assets/images/simon.png"],
    w8: ["Magic Man", "./assets/images/magicman.png"],
    w9: ["Prismo", "./assets/images/prismo2.png"],
    w10: ["The Lich", "./assets/images/lich.png"]
}

let wins = 0;
let losses = 0;
let randomNumber = 0;
let currentWord = "";
let guessesLeft = 0;
let lettersGuessed = [];
let splitArr = [];
let dashArr = [];
let displayWord = "";
let displayImage = "";
let wordArray = [wordBank.w1, wordBank.w2, wordBank.w3, wordBank.w4, wordBank.w5, wordBank.w6, wordBank.w7, wordBank.w8, wordBank.w9, wordBank.w10];

//Game setup
console.log("currentWord", currentWord);
function renderGame() {
    // Set a random word
    randomNumber = Math.floor(Math.random() * 10);    
    currentWord = wordArray[randomNumber][0];
    console.log("currentWord", currentWord);

    if (currentWord.length < 5) {
    guessesLeft = currentWord.length + 3;
    console.log("guessesLeft", guessesLeft);
    } else {
        guessesLeft = 8;
    }

    lettersGuessed = [];
    console.log("lettersGuessed", lettersGuessed);
    dashArr = [];




    splitArr = currentWord.toLowerCase().split('');
    console.log("splitArr", splitArr);

    // Check the length of word and render dashes
    // Check for spaces
    splitArr.map(index => {
        if (index === " ") {
            dashArr.push('   ');
        }

        else {
            dashArr.push('-');
        }
    })

    console.log("dashArr", dashArr);

    displayWord = dashArr.join('');

    console.log("displayWord", displayWord);

    document.querySelector("#display-word").innerHTML = displayWord.toUpperCase();
    document.querySelector("#display-wins").innerHTML = wins;
    document.querySelector("#display-losses").innerHTML = losses;
    document.querySelector("#display-guesses-left").innerHTML = guessesLeft;
    document.querySelector("#display-image").src = "./assets/images/finnandjake.png";
    document.querySelector("#display-letters-guessed").innerHTML = lettersGuessed;



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

        if (dashArr.indexOf('-') === -1) {
            console.log("Yay! You win");
            wins++;
            document.querySelector("#display-image").src = wordArray[randomNumber][1];
            document.querySelector("#instructions").innerHTML = "Press Enter To Start A New Game" ;
        }

        if (splitArr.indexOf(letter) === -1 && lettersGuessed.indexOf(letter) === -1) {
            console.log("False")
            guessesLeft--;
            lettersGuessed.push(letter);

            if (guessesLeft === 0) {
                console.log("You lose");
                losses++;
                renderGame();
            }


        }


        console.log("dashArr after guess:", dashArr);
        console.log("Guesses Left:", guessesLeft);
        console.log("Letters Guessed:", lettersGuessed);

        displayWord = dashArr.join('');
        document.querySelector("#display-word").innerHTML = displayWord.toUpperCase();
        document.querySelector("#display-guesses-left").innerHTML = guessesLeft;
        document.querySelector("#display-letters-guessed").innerHTML = lettersGuessed.join(' ').toUpperCase();

    }

    if (event.keyCode === 13 && dashArr.indexOf(' - ') === -1) {
        renderGame();
    }
}




//

renderGame();