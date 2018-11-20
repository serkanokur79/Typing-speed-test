const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var timer = [0,0,0,0];
var interval;
var timerRunning = false;
var trialNumber = 0;
var success = "x";
var noOfMistakes = 0;
var avarage = 0;

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

// Match the text entered with the provided text on the page:
function spellCheck() {
    let textEntered = testArea.value;
    let originTextMatch = originText.substring(0,textEntered.length);

    if (textEntered == originText) {
        success= "OK";
        addScoreToTable();
        clearInterval(interval);
        testWrapper.style.borderColor = "#429890";
        noOfMistakes = 0;
    } else {
        if (textEntered == originTextMatch) {
            testWrapper.style.borderColor = "#65CCf3";
        } else {
            testWrapper.style.borderColor = "#E95D0F";
            ++noOfMistakes;
            document.querySelector('.mistakesNo').innerHTML= noOfMistakes;
        }
    }
}

// Start the timer:
function start() {
    let textEnterdLength = testArea.value.length;
    if (textEnterdLength === 0 && !timerRunning) {
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }
    // console.log(textEnterdLength);
}

// Reset everything:
function reset() {
    if (success !== "OK"){
      success= "x";
    addScoreToTable();
      }
    clearInterval(interval);
    interval = null;
    timer = [0,0,0,0];
    timerRunning = false;
    noOfMistakes = 0;
    success = "x";
    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";
    document.querySelector('.mistakesNo').innerHTML= noOfMistakes;
}

// Event listeners for keyboard input and the reset
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);


//
function addScoreBoard(){
document.querySelector('.scoreTable').classList.toggle("hidden");
document.querySelector('.scoreTitle').classList.toggle("hidden");
document.querySelector('.note').classList.toggle("hidden");
}


function addScoreToTable(){
  ++ trialNumber;
 trialNumber == 1 ? addScoreBoard() : console.log("Table is there!");
  success=="OK"? avarage = Math.floor((timer[0]*60+timer[1]+timer[2]/100)/countWords(testArea.value)*100)/100 : avarage="NAN*";
  let TABLE = document.querySelector(".scoreTable");
  let TABLETB= TABLE.querySelector("tbody");
  let newRowText = "<tr><td>"+trialNumber+"</td><td>"+success+"</td><td>"+noOfMistakes+"</td><td>"+theTimer.innerHTML+"</td><td>"+avarage+"</td></tr>";
  TABLETB.innerHTML += newRowText;
}

function countWords(text){
  var arrayText= text.split(" ");
  return arrayText.length;
}
