{// Global Variables
var imgArr = new Array;                 //Array of all images of selected reaction types.
var sn2Questions = 0;                   //Number of questions on Sn2 reactions.
var sn1Questions = 0;                   //Number of questions on Sn1 reactions.
var e2Questions = 0;                   //Number of questions on E1 reactions.
var e1Questions = 0;                   //Number of questions on E2 reactions.
var addQuestions = 3;                   //Number of questions on Addition reactions.
var cctQuestions = 0;                   //Number of questions on Carbon Chain Transformation reactions.
var radQuestions = 0;                   //Number of questions on Radical reactions.
var msQuestions = 0;                   //Number of questions on Multi-Step reactions.
var numQuestions = 0;                   //Total number of questions for selected reaction types.
var scoreNum = 0;                       //The user's current score.
var chemCheckBoxes = document.getElementsByClassName("checkChem");  //All reactant checkboxes.
var img;                                //Path to image for currently selected question.
}

document.onclick = clicked;

async function clicked() {
    colourChecked();
}

function colourChecked() {
    var boxes = document.getElementsByClassName('checkBox');
    for(var i = 0; i < boxes.length;i++) {
        if(boxes[i].childNodes[0].checked) {
            boxes[i].classList.add("checked");
        }
        else {
            boxes[i].classList.remove("checked");
        }
        
    }

}

//  Counts the number of questions for selected reaction types.
function getReactionTypes() {
    if(sn2.checked) {
        numQuestions += sn2Questions;
    }
    if(sn1.checked) {
        numQuestions += sn1Questions;
    }
    if(e2.checked) {
        numQuestions += e2Questions;
    }
    if(e1.checked) {
        numQuestions += e1Questions;
    }
    if(addition.checked) {
        numQuestions += addQuestions;
    }
    if(cct.checked) {
        numQuestions += cctQuestions;
    }
    if(radical.checked) {
        numQuestions += radQuestions;
    }
    if(multi.checked) {
        numQuestions += msQuestions;
    }
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
        if(e2.checked) {
            for(var j = 0; j < e2Questions; j += 1) {
                imgArr[i] = "e2/" + j + ".png";
                i++;
            }
        }
        if(e1.checked) {
            for(var j = 0; j < e1Questions; j += 1) {
                imgArr[i] = "e1/" + j + ".png";
                i++;
            }
        }
        if(addition.checked) {
            for(var j = 0; j < addQuestions; j += 1) {
                imgArr[i] = "addition/" + j + ".png";
                i++;
            }
        }
        if(cct.checked) {
            for(var j = 0; j < cctQuestions; j += 1) {
                imgArr[i] = "cct/" + j + ".png";
                i++;
            }
        }
        if(radical.checked) {
            for(var j = 0; j < radQuestions; j += 1) {
                imgArr[i] = "radical/" + j + ".png";
                i++;
            }
        }
        if(multi.checked) {
            for(var j = 0; j < msQuestions; j += 1) {
                imgArr[i] = "multi/" + j + ".png";
                i++;
            }
        }
    }
}

//  Displays a random problem image in the document.
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
        case 'addition/0.png':
            if(br2.checked == true && h2o.checked == true && checked == 2){
                correct();
            }
            else {
                incorrect();
            } break;
        case 'addition/1.png':
            if(h2.checked == true && pt.checked == true && checked == 2) {
                correct();
            }
            else {
                incorrect();
            } break;
        case 'addition/2.png':
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
    window.scrollTo(0, 0);
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
