//I COMMENT A LOT SO I CAN REMEMBER WHAT I DID; NEED TO GET BETTER AT READABILITY 
//BASIC SCROLL VARIABLE FOR FUTURE SCROLL CAPTURING
let scrollValue;

//SEARCH FOR ELEMENTS GLOBAL
let flipPoint = document.getElementById('About_Me');
let nav = document.getElementById('navbar');
let homeContainer = document.getElementById('welcome-section').getElementsByClassName('space-flex');
let skillList = document.getElementById("Welcome-Skills");
let root = document.documentElement;
let welcomeBlackOverlay = document.getElementById("welcome-overlay");
let rect; //rect  FOR PROJECT SECTION CLIENT POSITIONS IN DOM

let fadeValue = 0;

//RETRIEVE OBJECTS GLOBAL
let contentBlocks = getObjects('*', "section");
let fadeArray = getObjects('.', 'fade-tag');
let items = document.querySelectorAll(".project-grid-container .project-box, .exit-project-header"); // GETS PROJECT SECTION BOXES

//CREATES 2D ARRAY AND ASSIGNS 2D ARRAY
let alt2DArray = TwoDArray(contentBlocks.length, 10);
let imageArray = ['https://images.pexels.com/photos/998641/pexels-photo-998641.jpeg',
    'https://images.unsplash.com/photo-1583224874284-c7aeb59863d7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
];
assign2DArray();


//EVENT LISTENERS
window.addEventListener("load", function () {
    console.log("loaded script!");
    skillDescriptionQueue(document.getElementById('Unity_Button'), 0, 70);
});

window.addEventListener("resize", () => {
    if (getComputedStyle(document.documentElement).getPropertyValue('--phone-check') == 0) { //GETS VALUE FROM CSS ROOT; CSS ROOT VARIABLE IS USED TO CHECK PHONE STATE; 1 BEING TRUE
        changeBar(document.getElementById('menu_button')); //GETS MENU BUTTON ELEMENT THEN TOGGLES IT ON IF PHONE STATE IS TRUE
    }
});

window.addEventListener("scroll", () => {

    let j = 1;
    let welcome = document.getElementById('welcome-section');
    scrollValue = $(window).scrollTop();
    TranslateBG(root, scrollValue); // MOVES BACKGROUND
    welcome.style.opacity = 1 * j;
    if (scrollValue > flipPoint.getBoundingClientRect().top + 800) {
        nav.classList.add("change-bg-nav");
        homeContainer[0].style.display = "none";
        homeContainer[1].style.display = "none";

    } else {
        nav.classList.remove("change-bg-nav");
        homeContainer[0].style.display = "block";
        homeContainer[1].style.display = "block";

    }
    fadeQueue(contentBlocks, scrollValue);
    toggleDisplayWelcome(welcomeBlackOverlay, scrollValue);
    toggleProjectAnimation();
    backgroundAnimationQueue("#projects", 0);


    /* GENERAL SCROLL DEBUGGING */

    //console.log(rect);
    //console.log(scrollValue);
});

function skillDescriptionQueue(element, arrNum, ratingNum) { //FUNCTION FOR MANIPULATING THE INTERACTIVE SKILL SECTION IN THE WEBSITE

    let buttonParent = element.parentElement;
    let buttonSiblingArr = buttonParent.children; //holds button array information to apply classes later
    let skillListSiblingsArr = document.getElementById("Skill_Items").children;

    //controls button highlight for assigning and hiding classes
    let j = 0;
    while (j < buttonSiblingArr.length) {
        buttonSiblingArr[j].classList.remove("selected-button");
        skillListSiblingsArr[j].style.display = "none";
        j++;
    }

    for (let i = 0; i < buttonSiblingArr.length; i++) {
        if (element == buttonSiblingArr[i]) {
            //console.log("got the element");
            element.classList.add("selected-button");
            root.style.setProperty("--skill-animation-width-pass", ratingNum + "%")
            skillListSiblingsArr[i].style.display = "flex";
        }
    }
    console.log(skillListSiblingsArr);
    if (getComputedStyle(document.documentElement).getPropertyValue('--phone-check') == 1) {
        if (document.getElementById("menu_button").classList.contains('change')) {
            console.log('YEET');
            changeBar(document.getElementById('menu_button'));
        }
    }
}

function toggleDisplayWelcome(element, scrollVal) { //I MADE A BLACK, FIXED OVERLAY. NEEDS TO BE SWITCHED OFF AFTER SCROLLING DOWN TO NOT AFFECT OTHER SECTIONS
    if (scrollVal < screen.height) {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}

function getObjects(identifier, className) {
    let array;
    if (identifier == ".") {
        array = document.getElementsByClassName(className);
        console.log('got class objects');
    } else if (identifier == "#") {
        array = document.getElementById(className);
        console.log('got id object');
    } else if (identifier == '*') {
        array = document.getElementsByTagName(className);
        console.log('got elements');
    } else
        array = document.getElementsByClassName(className);
    return array;
}

function assign2DArray() { //THIS ASSIGNS CLASSES WITH ".fade-tag" TO AN ARRAY TO PREP THEM
    for (let j = 0; j < contentBlocks.length; j++) {
        for (let i = 0; i < contentBlocks.length; i++) {
            alt2DArray[j] = contentBlocks[j].getElementsByClassName("fade-tag");
            console.log("got it");
        }
    }
}

//EARLY FADE FUNCTION FOR ABOUT ME SECTION
function fadeQueue(arr, scroll) {
    if (scroll > arr[fadeValue].getBoundingClientRect().top + 400) { //GETS POSITION IN WINDOW CLIENT OF EACH OBJECT TO DETERMINE WHERE IT NEEDS TO APPLY A FADE IN CLASS. EACH
        for (let j = 0; j < alt2DArray[fadeValue].length; j++) {
            alt2DArray[fadeValue][j].classList.add("fade-in");
            alt2DArray[fadeValue][j].style.display = "block";
            console.log(alt2DArray[fadeValue][j]);
        }
        if (fadeValue < arr.length - 1) fadeValue++;
    }
}

// CHECKS FOR ELEMENTS IN VIEWPORT (WINDOW) TO SEE IF IT NEEDS TO APPLY A CLASS FOR ANIMATION TO BRING THE ELEMENT IN VIEW
function checkForElementsInView(element) {
    rect = element.getBoundingClientRect(); //FINDS THE ELEMENT IN ARRAY IN THE FOLLOWING FUNCTION AND RETURNS A BOOLEAN VALUE; RETURNS TRUE IF THE ELEMENT EVALUATED MATCHES CONDITIONS IN RETURN

    return (
        Math.floor(rect.top) > -100 &&
        Math.floor(rect.bottom) < (  Math.floor(document.documentElement.clientHeight)) 
        
    );
}

function toggleProjectAnimation() {
    for (let i = 0; i < items.length; i++) {
        if (checkForElementsInView(items[i])) {
            if (!items[i].classList.contains("project-box-animation-in")) {
                items[i].classList.remove("project-box-animation-out");
                items[i].classList.add("project-box-animation-in");
                //items[i].children[0].classList.add("project-box-tran-toggle");



            }
        } else if (items[i].classList.contains("project-box-animation-in")) {
            items[i].classList.remove("project-box-animation-in");
            items[i].classList.add("project-box-animation-out");
            //items[i].children[0].classList.remove("project-box-tran-toggle");


        }
    }
}


function TranslateBG(bgOffset, scrollValue) { //bgOffset is for the root for css variables, root is passed through parameter "bgOffset" to manipulate css var
    bgOffset.style.setProperty('--moving-y', scrollValue * -0.3 + "px");
}

function TwoDArray(row, length) {
    let array = new Array(row)
    for (i = 0; i < row; i++) {
        array[i] = new Array(length);
    }
    return array;
}

function backgroundAnimationQueue(elementIdentifier, selectionOfBGArrayNum, opacityNumber) {
    let element = (elementIdentifier.charAt(0) == ".") ? document.getElementsByClassName(elementIdentifier.substring(1)) : document.getElementById(elementIdentifier.substring(1));
    let positionInView = element.getBoundingClientRect().top + 500;
    if (scrollValue >= positionInView) {
        //console.log("passed!" + element);
        element.style.background = "linear-gradient(rgba(0, 0, 0, 0.9) 100%, rgba(0, 0, 0, 0.7) 100%), url(" + imageArray[selectionOfBGArrayNum] + ")";
        element.style.backgroundPosition = '0px ' + ((scrollValue * 0.5) - 400) + 'px';
        element.style.backgroundSize = "cover";
    }


}

function changeBar(element) { //THIS HANDLES THE MOBILE VERSION FO THE SKILL SELECTOR WITH A MODAL OVERLAY TO CLICK AND CHOOSE THE SKILL TO SEE
    let tempArr = element.parentElement.children;
    let buttons = tempArr[2].children; //right-div NEEDS TO BE THE THIRD ELEMENT UNDER PARENT (dynamic) TO WORK
    element.classList.toggle('change');
    console.log(tempArr);


    if (element.classList.contains('change')) {
        tempArr[2].style.width = '100%';
        tempArr[2].style.opacity = 100;
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].style.opacity = 100;
        }
    } else {
        tempArr[2].style.width = '0%';
        tempArr[2].style.opacity = 0;
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].style.opacity = 0;
        }
    }

    if (getComputedStyle(document.documentElement).getPropertyValue('--phone-check') == 0) {
        tempArr[2].style.width = '100%';
        tempArr[2].style.opacity = 100;
        element.classList.add('change');
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].style.opacity = 100;
        }
    }

}

$(document).ready(function () { //JQUERY PRIMER 

});