//function to fade out elements
function fadeOut(el) {
    var opacity = 1; // Initial opacity
    var interval = setInterval(function() {
       if (opacity > 0) {
          opacity -= 0.2;
          el.style.opacity = opacity;
       } else {
          clearInterval(interval); // Stop the interval when opacity reaches 0
          el.style.display = 'none'; // Hide the element
       }
    }, 200)
    } 

// click title page to make it disappear
document.getElementById("titlePage").addEventListener("click", function () {
    fadeOut(titlePage);
});

//click instructions to make it disappear
var start = function (){
    document.getElementById('instructions').addEventListener('click', startGame);
   };


//game initialisation 

// function for audio when game start
var audio = new Audio('music/countdown.mp3');

//writing a countDown function with 3, 2, 1, go! as argumxent, followed by new words
var countDown = function (second) {
    document.getElementById("newWord").innerHTML= second;
}

//function to display input box after 4650 second
var displayInput = function () {
    document.getElementById("userInput").style.display ="block";
    document.getElementById("userInput").focus();
}

//function to start game with click event
var startGame = function (event) {
    document.getElementById("instructions").style.display ="none";
    //start audio when game starts
    audio.play();
    //set 3 2 1 timer
    setTimeout(countDown,750, 3);
    setTimeout(countDown,2000, 2);
    setTimeout(countDown,3250, 1);
    setTimeout(displayInput, 4650);
    setTimeout(countDown,4500, "GO!");
    //timer function
    setTimeout(timeChecker,5000);
    setTimeout(countDown,5750, getWord());
    //restart event listener again after 60 seconds
    setTimeout(start,60000);
}

// function for countdown timer
var timeChecker = function (){
    //60s timer
    var seconds = 60;
    //inner timer to -1 second
    var timer = function () {
        document.getElementById("sec").innerHTML = seconds + " secs";
        seconds--;
        // if time is still running and ice are still not broken
        if ((seconds == -1) && iceBroken<3) {
            clearInterval(runTimer);
            //disable input
            document.getElementById("userInput").style.display= "none";
            //add message overlay : fingers are still cold
            loserMessage ("AW SNAP! <br> Guess your fingers are still cold🧊🧊 <br> Click anywhere to keep warming up your fingers.");
            //pause countdown music
            audio.pause();
            // add losing music
            var lose = new Audio ("music/lose.mp3");
            lose.play();
        } else if ((seconds >= 1) && iceBroken ==3) {
            clearInterval(runTimer);
            winnerMessage ("YAY! <br> Your fingers are now warmed up and ready to go🔥🔥<br> Click anywhere to keep warming up your fingers.");
            //pause countdown music
            audio.pause();
            document.getElementById("userInput").style.display= "none";
            //play win music
            var win = new Audio ("music/win.mp3");
            win.play();
        }
    }

    //intervals to invoke timer function every 1000
    var runTimer = setInterval(timer, 1000);
}

//actual game


//list of words to randomise
var wordSet = ["disk", "bless", "delay", "fee", "tail", "pony", "fist", "storm", "flow", "bowel", "wash", "proof", "year", "vain", "fog", "sweep", "roar", "moon", "plan", "strap", "taste", "elbow", "stall", "basis", "short", "safe", "laser", "radio", "great", "eat", "claim", "snub", "tempt", "groan", "fault", "dare", "child", "bank", "thumb", "ready", "pilot", "park", "heavy", "tasty", "hen", "ratio", "soil", "door", "idea", "roll", "ride", "sail", "spine", "top", "pound", "rock", "solid", "body", "slab", "nail", "ring", "card", "flood", "valid", "stick", "random", "cage", "spend", "stock", "leash", "ally", "corn", "spare", "flush", "enjoy", "straw", "fame", "noble", "wear", "note", "donor", "solo", "guess", "cheap", "cell", "bride", "urge", "rugby", "grave", "seat", "long", "large", "fax", "way", "house", "line", "bear", "breed", "think", "duty", "ban", "funny", "guide", "story", "easy", "bike", "break", "buy", "show", "rifle", "tap", "toll", "ask", "board", "pin", "obese", "full", "theme", "hand", "sigh", "force", "rate", "beach", "tribe", "map", "page", "fruit", "class", "acute", "dish", "slant", "cold", "crash", "dream", "offer", "slide", "push", "gate", "acid", "free", "deal", "mercy", "draft", "memorandum", "fastidious", "redundancy", "resilience", "sashimi", "bakuteh", "crochet"];
var getWord = function () {
    let num = Math.floor(Math.random() * wordSet.length - 36);
    let selected = wordSet.splice(num,1);
    //wordSet.push(selected);
    console.log(selected)
    console.log (wordSet.length)
    return selected
}

//write a function to check user input value against a given word
var wordInput = function (event) {
    //change outline back to blue
    var correctOutline = document.getElementById("userInput");
    correctOutline.style.outlineColor = "#5DBDFF";
    var inputChecker = document.getElementById("userInput").value;

    if(inputChecker == document.getElementById("newWord").innerHTML) {
        //function to reduce hp bar by 30px and give monster a hard shake.
        decreaseHp();
        checkHp();
        //runs correct audio sound if it is correct
        var correct = new Audio('music/correct.mp3');
        correct.play();
        //randomly assign words into innerHTML
        document.getElementById("newWord").innerHTML =  getWord();
        //clear user input to clear after input
        document.getElementById("userInput").value = "";

    } else if (inputChecker !== document.getElementById("newWord").innerHTML){
        var wrong = new Audio('music/wrong.mp3');
        wrong.play();
        // write syntax to change color to something else
        var wrongOutline = document.getElementById("userInput");
        wrongOutline.style.outlineColor = "red";
        // it will shake twice using CSS
        wrongOutline.className = "shake-horizontal shake-constant";
        wrongOutline.value ="";
        //function to stop shaking
        var dontShake = function (){
            wrongOutline.className = "";
        }
        //stop shaking after 500ms
        setTimeout (dontShake,500);
    }
}

//function to reduce hp bar by 30px
var decreaseHp = function () {
    var width = parseInt(getComputedStyle(document.getElementById("hpBar")).width);
    width = (width - 25)+"px";
    document.getElementById("hpBar").style.width= width;
 }

// global variable to keep track of ice broken
var iceBroken = 0 ;

 // function to check if HP is zero. if HP is Zero, refresh HP and put in new ICE.
var checkHp = function () {
    //if HP = 0..
    if (parseInt(getComputedStyle(document.getElementById("hpBar")).width) == 0) {
        if(iceBroken == 0) {
            // add counter to ice broken
            iceBroken ++
            //change image to 2 ice
            document.getElementById("ice").src= "image/ice2.png";
            //restore back hpbar
            document.getElementById("hpBar").style.width = "300px";
        }else if (iceBroken==1) {
            iceBroken ++
            //change image to 1 ice
            document.getElementById("ice").src= "image/ice1.png";
            //restore back hpbar
            document.getElementById("hpBar").style.width = "300px";
        }else if (iceBroken==2) {
            iceBroken++
            document.getElementById("hpBar").style.width = "0px";
            document.getElementById("userInput").disabled= true;
            document.getElementById("userInput").display= "none";
        }
    }
}


// adding event listener to the input function
var userInput = document.getElementById('userInput').addEventListener('change', wordInput);

//enable event listener
start ();

//write a function to display winner message as an overlay using DOM manipulation
var winnerMessage = function (result) {
    // create a span element
    var message = document.createElement("span");
    // span text will be testing testing
    message.innerHTML = result;
    // get document ID by overlay
    var overlay = document.getElementById("win");
    //append span element to overlay div
    overlay.appendChild(message);
    // div display will turn from none to ficeblock
    overlay.style.display = "block";
    // add click event listener to overlay display, and make display back to none.
    document.getElementById("win").addEventListener("click", function () {
        overlay.style.display = "none";
        overlay.removeChild(message);
    })
}


//write a function to display loser  message as overlay. should be using DOM manipulation and query selector to create overall inlays
var loserMessage = function (result) {
// create a span element
var message = document.createElement("span");
// span text will be testing testing
message.innerHTML = result;
// get document ID by overlay
var overlay = document.getElementById("lose");
//append span element to overlay div
overlay.appendChild(message);
// div display will become block
overlay.style.display = "block";
// add click event listener to overlay display, and make display back to none.
document.getElementById("lose").addEventListener("click", function () {
    overlay.style.display = "none";
    overlay.removeChild(message);
})
}
