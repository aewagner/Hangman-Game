

//Create Word Bank
const wordBank = {
    w1: ["Finn", "./assets/images/Finn.png"],
    w2: ["Jake", "./assets/images/jake.png"],
    w3: ["Princess Bubblegum", "./assets/images/pbg.png"],
    w4: ["Marceline the Vampire Queen", "./assets/images/marceline.png"],
    w5: ["BMO", "./assets/images/bmo.png"],
    w6: ["Lemongrab", "./assets/images/lemongrab.png"],
    w7: ["Ice King", "./assets/images/simon.png"],
    w8: ["Magic Man", "./assets/images/magicman.png"],
    w9: ["Prismo", "./assets/images/prismo2.png"],
    w10: ["The Lich", "./assets/images/lich.png"],
    w11: ["Lumpy Space Princess","./assets/images/lsp.png"],
    w12: ["Tree Trunks","./assets/images/treetrunks.png"],
    w13: ["Flame Princess","./assets/images/flameprincess.png"],
    w14: ["Gunther","./assets/images/gunther.png"],
    w15: ["Billy","./assets/images/billy.png"],
    w16: ["Susan Strong","./assets/images/susan.png"],
    w17: ["Neptr","./assets/images/neptr.png"],
    w18: ["Cinnamon Bun","./assets/images/cinnamonbun.png"],
    w19: ["Lady Rainicorn","./assets/images/ladyrainicorn.png"],
    w20: ["Peppermint Butler","./assets/images/peppermintbutler.png"],
    w21: ["James Baxter","./assets/images/jamesbaxter.png"]

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
let wordArray = [wordBank.w1, wordBank.w2, wordBank.w3, wordBank.w4, wordBank.w5, wordBank.w6, wordBank.w7, wordBank.w8, wordBank.w9, wordBank.w10, wordBank.w11, wordBank.w12, wordBank.w13, wordBank.w14, wordBank.w15, wordBank.w16, wordBank.w17, wordBank.w18, wordBank.w19, wordBank.w20, wordBank.w21];

//Game setup
// console.log("currentWord", currentWord);
function renderGame() {
    // Set a random word
    randomNumber = Math.floor(Math.random() * 21);    
    currentWord = wordArray[randomNumber][0];
    console.log("currentWord", currentWord);

    if (currentWord.length < 8) {
    guessesLeft = currentWord.length + 3;
    // console.log("guessesLeft", guessesLeft);
    } else {
        guessesLeft = 8;
    }

    lettersGuessed = [];
    // console.log("lettersGuessed", lettersGuessed);
    dashArr = [];




    splitArr = currentWord.toLowerCase().split('');
    // console.log("splitArr", splitArr);

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

    // console.log("dashArr", dashArr);

    displayWord = dashArr.join('');

    // console.log("displayWord", displayWord);

    document.querySelector("#display-word").innerHTML = displayWord.toUpperCase();
    document.querySelector("#display-wins").innerHTML = wins;
    document.querySelector("#display-losses").innerHTML = losses;
    document.querySelector("#display-guesses-left").innerHTML = guessesLeft;
    document.querySelector("#display-image").src = "./assets/images/finnandjake.png";
    document.querySelector("#display-letters-guessed").innerHTML = lettersGuessed;
    document.querySelector("#instructions").innerHTML = "Guess A Letter To Get Started!" ;



}




//Create event listener
document.onkeyup = function (event) {

    // Captures the key press, converts it to lowercase, and saves it to a variable.
    let letter = String.fromCharCode(event.keyCode).toLowerCase();
    // console.log(letter);
    // console.log("splitArr after event", splitArr);

    if (/[a-z]/.test(letter)) {
        //Check for letter
        // if (splitArr.indexOf(letter)) {
        // console.log("TRUE");
        for (let i = 0; i < splitArr.length; i++) {
            if (splitArr[i] === letter) {
                dashArr.splice(i, 1, letter);
            }
        }
        // } 

        if (dashArr.indexOf('-') === -1) {
            // console.log("Yay! You win");
            wins++;
            document.querySelector("#display-image").src = wordArray[randomNumber][1];
            document.querySelector("#instructions").innerHTML = "Press Enter To Start A New Game";
        }

        if (splitArr.indexOf(letter) === -1 && lettersGuessed.indexOf(letter) === -1) {
            // console.log("False")
            guessesLeft--;
            lettersGuessed.push(letter);

            if (guessesLeft === 0) {
                // console.log("You lose");
                losses++;
                renderGame();
            }


        }


        // console.log("dashArr after guess:", dashArr);
        // console.log("Guesses Left:", guessesLeft);
        // console.log("Letters Guessed:", lettersGuessed);

        displayWord = dashArr.join('');
        document.querySelector("#display-word").innerHTML = displayWord.toUpperCase();
        document.querySelector("#display-guesses-left").innerHTML = guessesLeft;
        document.querySelector("#display-letters-guessed").innerHTML = lettersGuessed.join(' ').toUpperCase();

    }

    if (event.keyCode === 13 && dashArr.indexOf('-') === -1) {
        renderGame();
    }
}




//

renderGame();

// Mobile Keyboard
document.getElementById('openKeyboard').addEventListener('click', function(){
    var inputElement = document.getElementById('hiddenInput');
    inputElement.style.visibility = 'visible'; // unhide the input
    inputElement.focus(); // focus on it so keyboard pops
    inputElement.style.visibility = 'hidden'; // hide it again
});