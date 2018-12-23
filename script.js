{// Global Variables
var imgArr = new Array;                 //Array of all images of selected reaction types.
var sn2Questions = 2;                   //Number of questions on Sn2 reactions.
var sn1Questions = 1;                   //Number of questions on Sn2 reactions.
var numQuestions = 0;                   //Number of questions for selected reaction types.
var scoreNum = 0;                       //The user's current score.
var sn2Reactants = document.getElementsByClassName("sn2Reactant");  //Sn2 reactant checkboxes.
var sn1Reactants = document.getElementsByClassName("sn1Reactant");  //Sn1 reactant checkboxes. 
var chemCheckBoxes = document.getElementsByClassName("checkChem");  //All reactant checkboxes.
var img;                                //Path to image for currently selected question.
}

//  Counts the number of questions and displays appropriate reactants 
//  for selected reaction types.
function getReactionTypes() {
    if(sn2.checked) {
        numQuestions += sn2Questions;
        for(var i = 0; i<sn2Reactants.length; i++)
            sn2Reactants[i].style.display = "inline-block";
    } else {for(var i = 0; i<sn2Reactants.length; i++) sn2Reactants[i].style.display = "none";}
    if(sn1.checked) {
        numQuestions += sn1Questions;
        for(var i = 0; i<sn1Reactants.length; i++)
            sn1Reactants[i].style.display = "inline-block";
    } else {for(var i = 0; i<sn1Reactants.length; i++) sn1Reactants[i].style.display = "none";}
}

//  Initially loads the game.
function start() {
    numQuestions = 0;
    getReactionTypes();
    populateArray();
    if(numQuestions != 0) {
        game.style.display = "block";
        menu.style.display = "none";
        reset();
    } else {alert("Select at least one reaction type.");}
}

//  Resets the score, hides the game, and displays the menu.
function returnToMenu() {
    scoreNum = 0;
    game.style.display = "none";
    menu.style.display = "block";
}

//  Loads a new problem and updates the score.
function newRound() {
    getRandomImage();
    score.innerHTML = scoreNum;
}

//  Creates an array of all problem files.
//  precondition: All files must be named as 0.png, 1.png...
function populateArray() {
    for(var i = 0; i < numQuestions;) {
        if(sn2.checked) {
            for(var j = 0; j < sn2Questions; j += 1) {
                imgArr[i] = "sn2/" + j + ".png";
                i++;
            }
        }
        if(sn1.checked) {
            for(var j = 0; j < sn1Questions; j += 1) {
                imgArr[i] = "sn1/" + j + ".png";
                i++;
            }
        }
    }
}

//  Displays a random image in the document.
function getRandomImage() {
    var path = 'problems/';
    var probNum = Math.floor( Math.random() * imgArr.length );
    img = imgArr[probNum];
    question.setAttribute("src", path + img);
}

//  Compares answers given in checkboxes and prints a message based on answer.
function checkAnswer() {
    var checked = document.querySelectorAll('#dashBoxes :checked').length;
    switch(img){
        case 'sn2/0.png':
            if(br2.checked == true && h2o.checked == true && checked == 2){
                correct();
            }
            else {
                incorrect();
            } break;
        case 'sn2/1.png':
            if(h2.checked == true && pt.checked == true && checked == 2) {
                correct();
            }
            else {
                incorrect();
            } break;
        case 'sn1/0.png':
            if(hbr.checked == true && h2o2.checked == true && checked == 2) {
                correct();
            }
            else {
                incorrect();
            } break;
        default:
            break;
    }
}

//  Increments score by one and loads a new problem.
function correct() {
    scoreNum += 1;
    reset();
}

//  Displays answer and resets score to 0.
function incorrect() {
    displayAnswer();
    scoreNum = 0;
}

//  Hides main page and displays the answer.
function displayAnswer() {
    dashboard.style.display = "none";
    answer.style.display = "block";
    question.setAttribute("src", 'answers/' + img);
}

//  Resets the program.
function reset() {
    dashboard.style.display = "inline-block";
    answer.style.display = "none";
    newRound();
    clearBoxes();
}

//  Clears dashboard checkboxes.
function clearBoxes() {
    for(var i = 0; i<chemCheckBoxes.length; i++)
        chemCheckBoxes[i].checked = false;
}
