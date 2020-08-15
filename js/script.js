// // // // // // / / // / // // // // // // // // ///
/* Variables that are used throughout the website. */

/* sessionCheck is called to make sure an indexVal doesn't already exit.  */
sessionCheck();

	/* indexVal is a random number that is generated each run through the story. Depending on the number generated,
		the order of fruit are in a specified order and the Guessing Game has a specific fruit hints.  */
var indexVal = parseInt(sessionStorage.getItem("indexVal"));

	/* Contains the id's of each fruit so they can be altered when the indexVal is changed. */
var fruitImages = {

			"apple": ["apple-pg", "apple-pg","apple-pg","apple-pg","apple-pg"], 
			"pear": ["pear-pg1", "pear-pg2", "pear-pg1", "pear-pg2","pear-pg1", "pear-pg2"],
			"plum": ["plum-pg1", "plum-pg2", "plum-pg3", "plum-pg1", "plum-pg1"],
			"strawberry": ["strawb-pg1", "strawb-pg2", "strawb-pg3", "strawb-pg2", "strawb-pg1"],
			"orange": ["orange-pg1", "orange-pg2", "orange-pg3", "orange-pg4", "orange-pg5"]
};

	/* For the Guessing Game, JavaScript changes the hint depending on the fruit the user is guessing. 
		They are stored here. */
var fruitHints = {


	"apple": ["I am a member of the rose family",
	"I grow on a tree","There are over 7,000 varieties of me","Humans have enjoyed me since 6500 BC"],
	
	"pear": ["I am native to Asia and Europe.","I am a symbol of immortality in China",
	"A variety of me is as crunchy as an apple","I was nicknamed 'the gift of the gods'"],
	
	"plum": ["I am grown on every continent except Antartica","I am a stone fruit",
	"I am known as a prune if I am dried out","I am usually between 2.5 and 7.5 centimeters"],
	
	"strawberry": ["I am the first fruit to ripen in Spring","I have 200 seeds on my skin",
	"I grow on a bush and give off a fragrance","I am not a berry "],

	"orange": ["The tree that I grow on can live for 100 years","I am the largest citrus crop in the world",
	"I am full of Vitamin C","Surprisingly, I wasn't named after my colour!"]

	/* References for these facts are found on the Grown Ups page. */
};


	/* The ordered lists of fruit this run through the story, specified by indexVal. */
var fruitNamePlural = fruitSwitch(indexVal, true);
var fruitNameSingular = fruitSwitch(indexVal, false);

	/* gameExt is a variable that stores information on whether the user has entered the guessing game
		externally from the story. If gameExt is equal to 1, the user is not shown the "Continue Story" button. */
var gameExt = parseInt(sessionStorage.getItem("gameExt"));

// // // // // // / // / // // // / // // // /
/* Functions that are used in the website. */


/* If JavaScript is enabled, this function adds a prompt to the user. */
function hintLoad() {

	$("#hint").html('(Hover your mouse over the food)');
}

/* This function calls the sessionSave() function and then sets gameExt to 1. */
function extSessionSave() {

	sessionSave();

	sessionStorage.setItem("gameExt", "1");
}


/* This function handles the changing of the text, so that a user who has accessed the game externally, 
	wont be shown the "Continue Story" prompt. */
function gameAnsAlt() {

	if (gameExt == 1) {

		$("#continue-story").html("Back to Homepage");

		$("#continue-story").attr("href", "index.html")
	}
}


/* This game removes the variable of gameExt so that, just in case, users wont be shown or prompted to 
	read the rest of the story. */
function storyGame() {

	// Use of sessionStorage to save an item to the current browser session
	sessionStorage.removeItem("gameExt");
	sessionStorage.setItem("gameExt", "0");
	
}

/* Clears current value, then generates and stores the integer of indexVal. */
function sessionSave() {

	// Calls randomGen() function
	var value = randomGen();

	// Stores the value in sessionStorage
	sessionStorage.setItem("indexVal", value);

	
}


/* This function sets a random number to the indexVal if called. This is to make ensure users who arrive on a random page, 
	can still access the functionality of the website. */
function sessionCheck() {

	if (!sessionStorage.getItem("indexVal")) {

		sessionStorage.setItem("indexVal", randomGen());
	}
}


/* This function simply exectues the fruitImageAlt() and getFruitName(). 

	count (integer): The number of images on each page. 
	index (integer): The index that corresponds to current fruit. */
function onload(count, index) {

	fruitImageAlt(count, index);

	getFruitName(index);
}


/* This function handles the loading of correct hints for specific fruit at index 3. */ 
function gameLoad() {

	// A local index is used to iterate through the hints
	var localInd = 0;
	
	// Accesses the name of the fruit at index 3
	var fruitNameCurr = fruitNameSingular[3];
	
	// Accesses the hints for the current fruit
	var fruitHintList = fruitHints[fruitNameCurr];
	
	// Loops through all the children of #reveal-box and sets the text to the current hints.
	$("#reveal-box").children().each( function changeText() {

		if ($(this).attr('class') == 'clueStyle') {

			var textChange = fruitHintList[localInd]
			
			$(this).html(textChange);

			localInd += 1;

			// The text is initially hidden from the user.
			$(this).hide();

		} else if (($(this).attr('class') == 'hintStyle')) {

			// The buttons to reveal the hints are shown. 
			$(this).show();
		
		}
	})

	// Loops through all the children of #guess-box, so the user clicking on the 
	// 			correct button will trigger the correct action.
	$('#guess-box').children().each( function changeButtonFunc() {

		if ($(this).attr('class') == 'buttonStyle') {

			var currentId = fruitNameCurr + '-guess';

			$(this).removeAttr('href');

			// If the id of the fruit to be guessed matches the current id, appropriate link added.
			if ($(this).attr('id') == currentId) {

				$(this).attr('href', 'guessing-correct.html')
			} else {

				// All other links lead to the incorrect page.
				$(this).attr('href', 'guessing-wrong.html')
			}
		}
	})


}

/* This function handles the image and text changing, so that user can see the fruit when they guess correct. */
function guessCorrect() {

	// Handles the change of text.
	gameAnsAlt();

	var fruitNameCurr = fruitNameSingular[3];
	
	var newText = ""


	// Proper grammar is added because it is of utmost importance.
	if (fruitNameCurr == "apple" || fruitNameCurr == "orange") {

		newText += "an ";
	} else {

		newText += "a ";
	}



	$(".fruit-name").html(newText + fruitNameCurr);
	$(".imageAlt").removeAttr('id');
	$(".imageAlt").attr('id', fruitImages[fruitNameCurr][0]);
}

/* Handles the removal of the hint "button". */
function revealClue(int) {

	var integer = int.toString();

	$("#clue-" + integer).show();
	$("#hint-" + integer).hide();
}


/*	This function alters the images of the fruit on each page, 
		corresponding to the altered names. 

	count (integer): The number of images on each page. 
	index (integer): The index that corresponds to current fruit.  */
function fruitImageAlt(count, index) {

	var localInd = 0;
	var fruitNameCurr = fruitNameSingular[index];
	

	$("#fruit-box").children().each( function swap(localInd) {


		var idChange = fruitImages[fruitNameCurr][localInd];


		$(this).attr("id", idChange);
		localInd += 1

	});
}



/* This function returns the string of the name 
	
	index (integer): The index that corresponds to current fruit. */
function getFruitName(index) {
	//console.log("Index: " + index);

	if (index != 0) {

		console.log(fruitNamePlural);
		$(".fruit-name").html(fruitNamePlural[index])
		
	} else {
		
		console.log(fruitNameSingular);
		$(".fruit-name").html(fruitNameSingular[index]);
	}
}



/* This function isn't run by the user, instead runs in the background. 
		It automatically runs through and collects the values for the run through of the story. */
function fruitSwitch(value, plural) {

	var returnList;

	if (plural == true) {
		switch(value) {

			case 0: 
				returnList =  ["apples","pears","plums","strawberries","oranges"];
				break;

			case 1:
				returnList = ["pears","plums","strawberries","oranges", "apples"];
				break;
				
			case 2:
				returnList = ["plums","strawberries","oranges", "apples","pears"];
				break;
				
			case 3:
				returnList = ["strawberries","oranges", "apples","pears","plums"];
				break;
				
			case 4: 
				returnList = ["oranges", "apples","pears","plums","strawberries"];
				break;
					
			default: 
				console.log("default" )
				break;
			}
			return returnList;
		} else {
		
		switch(value) {

			case 0:
				returnList = ["apple", "pear", "plums", "strawberry", "orange"];
				break;
			
			case 1:
				returnList = ["pear", "plum", "strawberry", "orange","apple"];
				break;
				
			case 2:
				returnList = ["plum", "strawberry", "orange","apple","pear"];
				break;
				
			case 3:
				returnList = ["strawberry", "orange","apple","pear","plum"];
				break;
				
			case 4: 
				returnList = ["orange","apple","pear","plum","strawberry"];
				break;
					
			default: 
				console.log("default" );
				break;
			}
		}
		return returnList;
	}


/* Returns a random integer between 0 and 4. */
function randomGen() {

	var rand = Math.floor(Math.random() * 5)
	return rand;
}