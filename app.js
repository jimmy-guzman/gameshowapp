const qwerty = document.getElementById('qwerty');
const buttons = qwerty.getElementsByTagName('button');
const phrase = document.getElementById('phrase');
const ul = phrase.querySelector('ul');
const overlay = document.getElementById('overlay');
const startGame = overlay.querySelector('.btn__reset');
const scoreboard = document.getElementById('scoreboard');
const ol = scoreboard.querySelector('ol');
let tries = ol.children;
let missedGuesses = 0;

const phrases = ["Russel Westbrook", "Steven Adams", "Andre Robertson", "Paul George", "Carmelo Anthony"];

startGame.addEventListener('click', function() {
  overlay.style.display = "none";
});

const phraseArray = getRandomPhraseArray(phrases);
addPhraseToDisplay(phraseArray);

function getRandomPhraseArray(arr) {
  let randomPosition = Math.floor(Math.random() * (arr.length));
  let randomPhrase = arr[randomPosition];
  let characters = randomPhrase.split('');
  return characters;
}

function addPhraseToDisplay(arr) {
  for (let i = 0; i < arr.length; i++) {
    let li = document.createElement('li');
    li.textContent = arr[i];
    if (li.textContent != ' ') {
      li.classList.add('letter');
    } else {
      li.classList.add('space');
    }
    ul.appendChild(li);
  }
}

function checkLetter(buttonClicked) {
  let buttonText = buttonClicked.textContent;
  let letters = ul.querySelectorAll('.letter');
  let letterFound;
  for (let i = 0; i < letters.length; i++) {
    let li = letters[i];
    let letter = li.textContent;
    if (buttonText === letter.toLowerCase()) {
      li.classList.add('show');
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
  buttons[i].addEventListener('click', function(e) {
    e.target.classList.add('chosen');
    e.target.setAttribute("disabled", "");
    let buttonClicked = e.target;
    let letterFound = checkLetter(buttonClicked);
    if (letterFound === null) {
      ol.removeChild(tries[0])
      missedGuesses += 1;
    }
    checkWin();
  })
}

function checkWin() {
  let letterClasses = ul.querySelectorAll('.letter');
  let showClasses = ul.querySelectorAll('.show');
  let title = overlay.querySelector('.title');
  if (letterClasses.length === showClasses.length) {
    overlay.classList.replace("start","win");
    title.textContent = "You Win!";
    overlay.style.display = "";
  } else if (missedGuesses >= 5) {
    overlay.classList.replace("start", "lose");
    title.textContent = "You Lose";
    overlay.style.display = "";
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
