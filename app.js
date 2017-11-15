const qwerty = document.getElementById("qwerty");
const buttons = qwerty.getElementsByTagName("button");
const phrase = document.getElementById("phrase");
const ul = phrase.querySelector("ul");
const overlay = document.getElementById("overlay");
const overlayButton = overlay.querySelector(".btn__reset");
const scoreboard = document.getElementById("scoreboard");
const ol = scoreboard.querySelector("ol");
const hearts = ol.querySelectorAll("img");
let missedGuesses = 0;

const phrases = [
  "Cut corners",
  "Miss the boat",
  "See eye to eye",
  "Break the ice",
  "When pigs fly",
  "Break a leg",
  "Piece of cake",
  "On the ball",
  "Rule of Thumb",
  "Last straw"
];

let phraseArray = getRandomPhraseArray(phrases);
addPhraseToDisplay(phraseArray);

overlayButton.addEventListener("click", function () {
  let buttonText = overlayButton.textContent;
  
  overlay.style.display = "none";
  overlay.classList.remove("start");
  //resets phrases, buttons, hearts
  if (buttonText === "Play Again!") {
    ul.innerHTML = "";
    missedGuesses = 0;
    for (let i = 0; i < hearts.length; i++) {
      hearts[i].src = "images/liveHeart.png";
    }
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("chosen");
      buttons[i].removeAttribute("disabled");
    }
    let phraseArray = getRandomPhraseArray(phrases);
    addPhraseToDisplay(phraseArray);
  }
});

function getRandomPhraseArray(arr) {
  let randomPosition = Math.floor(Math.random() * arr.length);
  let randomPhrase = arr[randomPosition];
  let characters = randomPhrase.split("");
  return characters;
}

function addPhraseToDisplay(arr) {
  for (let i = 0; i < arr.length; i++) {
    let li = document.createElement("li");
    li.textContent = arr[i];
    if (li.textContent != " ") {
      li.classList.add("letter");
    } else {
      li.classList.add("space");
    }
    ul.appendChild(li);
  }
}

function checkLetter(buttonClicked) {
  let buttonText = buttonClicked.textContent;
  let letters = ul.querySelectorAll(".letter");
  let letterFound;

  for (let i = 0; i < letters.length; i++) {
    let li = letters[i];
    let letter = li.textContent;
    if (buttonText === letter.toLowerCase()) {
      li.classList.add("show");
      letterFound = letter;
    }
  }
  if (letterFound) {
    return letterFound;
  } else {
    return null;
  }
}

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function (e) {
    let buttonClicked = e.target;
    let letterFound = checkLetter(buttonClicked);

    buttonClicked.classList.add("chosen");
    buttonClicked.setAttribute("disabled", "");

    if (letterFound === null) {
      missedGuesses += 1;
      hearts[hearts.length - missedGuesses].src = "images/lostHeart.png";
    }
    checkWin();
  });
}

function checkWin() {
  let letterClasses = ul.querySelectorAll(".letter");
  let showClasses = ul.querySelectorAll(".show");
  let title = overlay.querySelector(".title");

  if (letterClasses.length === showClasses.length) {
    //creates win overlay
    overlay.classList.remove("lose");
    overlay.classList.add("win");
    title.textContent = "You Win!";
    overlayButton.textContent = "Play Again!";
    overlay.style.display = "flex";
  } else if (missedGuesses >= 5) {
    //creates lose overlay
    overlay.classList.remove("win");
    overlay.classList.add("lose");
    title.textContent = "You Lose";
    overlayButton.textContent = "Play Again!";
    overlay.style.display = "flex";
  }
}

// window.addEventListener("keypress", grabKeyPressed, false);
//
// function grabKeyPressed(e) {
//    let charCode = e.charCode;
//    let character = String.fromCharCode(charCode);
//    checkLetter(character);
//    disableButton(character);
// }
//
//
// function disableButton(character) {
//   let qwertyButtons = qwerty.getElementsByTagName('button');
//   for (let i = 0; i < qwertyButtons.length; i++) {
//     let button = qwertyButtons[i];
//     let buttonText = button.textContent;
//     if (character === buttonText) {
//       button.classList.add('chosen');
//     }
//   }
// }