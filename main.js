//VARIABLES

// checking for difficulty level
let countdown = document.querySelector('.difficulty:checked').value;

// alphabet object with letters parred with the appropriate numerical value
const alphabet = [
    {
    letter: 'a',
    value: 1
},
{
    letter: 'b',
    value: 2
},
{
    letter: 'c',
    value: 3
},
{
    letter: 'd',
    value: 4
},
{
    letter: 'e',
    value: 5
},
{
    letter: 'f',
    value: 6
},
{
    letter: 'g',
    value: 7
},
{
    letter: 'h',
    value: 8
},
{
    letter: 'i',
    value: 9
},
{
    letter: 'j',
    value: 10
},
{
    letter: 'k',
    value: 11
},
{
    letter: 'l',
    value: 12
},
{
    letter: 'm',
    value: 13
},
{
    letter: 'n',
    value: 14
},
{
    letter: 'o',
    value: 15
},
{
    letter: 'p',
    value: 16
},
{
    letter: 'q',
    value: 17
},
{
    letter: 'r',
    value: 18
},
{
    letter: 's',
    value: 19
},
{
    letter: 't',
    value: 20
},
{
    letter: 'u',
    value: 21
},
{
    letter: 'v',
    value: 22
},
{
    letter: 'w',
    value: 23
},  
{
    letter: 'x',
    value: 24
},
{
    letter: 'y',
    value: 25
},
{
    letter: 'z',
    value: 26
}
]

// list of all values 1-26
let valuesList = alphabet.map( a => a = a.value);

// empty string for storing obtained random values
let randomList = [];

// elements from DOM stored in variables
const start = document.querySelector('.btn-start');
const input = document.getElementById('input-letter');
const selectDifficulty = document.querySelectorAll('.difficulty');
const letterNumber = document.querySelector('.letter-value');
const alphabetContainer = document.querySelector('.alphabet-container');

// variables for tracking the game score
const hit = document.getElementById('hit');
const miss = document.getElementById('miss');
const left = document.getElementById('left');
let hitValue = 0;
let missValue = 0;
let leftValue = 26;

// EVENT LISTENERS

// event listeners for start button and letter input field
start.addEventListener('click', timeout);
input.addEventListener('keyup', getLetter);

// checking witch difficulty is set
selectDifficulty.forEach(a => a.addEventListener('change',
()=>{countdown = document.querySelector('.difficulty:checked').value;
document.querySelector('.timer').innerHTML = countdown;}));

// FUNCTIONS

// trigered when pressing start button

function timeout() {
    // disable difficulty selection
    selectDifficulty.forEach(a=> a.disabled = true);
    // enable letter input, automatically focus on input
    // and remove event listener from start button
    input.disabled = false;
    input.focus();
    start.removeEventListener('click', timeout);
    
    // rename start button into stop
    start.innerHTML = 'Stop';
    // reset score variables and put values in DOM
    hitValue = 0;
    missValue = 0;
    leftValue = 26;
    hit.innerHTML= hitValue;
    miss.innerHTML= missValue;  
    left.innerHTML= leftValue;

    // set all letters in the screen to gray
    for (let i =1; i <27; i++) {
        document.getElementById(i).style.color = 'gray';
    }

    // start interval that will call two functions 
    // in accordance with the set difficulty level
    let interval = setInterval(()=>{
        randomNumber(interval);
        // checkColor receives an argument 
        // this argument looks at the array of generated random numbers
        // to find the previously generated random number
        checkColor(randomList[randomList.length-2]);
    }, countdown);
    // call randomNumber function as soon as the 
    // start button is clicked without waiting for the interval
    randomNumber(interval);
    // add stop() function to start button previously renamed to stop
    start.addEventListener('click', ()=>{stop(interval)});
}

// this function checks if the user pressed a key during a single interval
function checkColor(id) {
    // if the user did not press any key color will remain gray (or the value will be empty)
    
    if (document.getElementById(id).style.color == ''
        || document.getElementById(id).style.color == 'gray') {
        // change the color to red and adjust the score
        document.getElementById(id).style.color = 'red';
        missValue++;
        leftValue--;
        miss.innerHTML= missValue;  
        left.innerHTML= leftValue;
    }
};

// function to generate random numbers
function randomNumber(interval) {
    // enable and focus on input
    input.disabled = false;
    input.focus();

    // check if all the numbers were already displayed
    if (valuesList.length != 0) {
        // random number is taken from the list of letter values created 
        // on the top of this script
        let random = valuesList[Math.floor(Math.random() * valuesList.length)];
        // display the number
        letterNumber.innerHTML = random;
        // add the number to the list of generated random numbers
        randomList.push(random);
        // remove the number from the list of letter values
        valuesList = valuesList.filter(a => a !=random);
    } else {
        // if no more numbers remain
        // stop the interval
            clearInterval(interval);
        // check if the last value was guessed
            checkColor(randomList[randomList.length-1]);
        // reset 
            valuesList = alphabet.map( a => a = a.value);
            start.innerHTML = 'Start';
            input.disabled = true;
            selectDifficulty.forEach(a=> a.disabled = false);
    }
    
}


// function that gets the letter from input and checks if it is correct
function getLetter() {
    // get input value and store it in a variable
    inputLetter = input.value;
    // disable input (to prevent the user from choosing multiple letters)
    input.disabled = true;

    // check the input against the alphabet object (defined on the top)
    if (alphabet.filter(a => a.letter == inputLetter)[0].value == letterNumber.innerText) {
        // turn the appropriate letter to green and adjust score 
        document.getElementById(letterNumber.innerText).style.color = 'green';
        hitValue++;
        leftValue--;
        hit.innerHTML = hitValue;
        left.innerHTML = leftValue;

    } else {
        // turn the appropriate letter to red and adjust score
        document.getElementById(letterNumber.innerText).style.color = 'red';
        missValue++;
        leftValue--;
        miss.innerHTML = missValue;
        left.innerHTML = leftValue;
    };
    // reset input value to empty string
    input.value = '';
}

// function to stop the game
function stop(interval) {
    // once the button is clicked toggle event listeners
    start.removeEventListener('click', stop);
    start.addEventListener('click', timeout);
    // reset all values
    start.innerHTML = 'Start';
    for (let i =1; i <27; i++) {
        document.getElementById(i).style.color = 'gray';
    };
    hitValue = 0;
    missValue = 0;
    leftValue = 26;
    hit.innerHTML= hitValue;
    miss.innerHTML= missValue;  
    left.innerHTML= leftValue;
    valuesList = alphabet.map( a => a = a.value);
    input.disabled = true;
    selectDifficulty.forEach(a=> a.disabled = false);
    clearInterval(interval);
    randomList = [];
    letterNumber.innerHTML = '';
}