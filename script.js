/////////////////// Home page /////////////////////////
// TODO: MDP Add kid 
// TODO: Go to parent portal stats.html
// TODO: Go to kids page kid.html
// TODO: PARKING LOT Login 

/////////////////// Materialize JS /////////////////////////
$( document ).ready(function(){
	$(".dropdown-trigger").dropdown();
})


//////////////////// Global variables////////////////// 
var kid1ScreenBal = 60;
var kid1Allowence = .10;
var kid1MonBal = 0.00;
var kid1MonReqst = 0;
var kid1MoneyHist = [];
var kid1Info = ("name", "age")

//////////////// Testing object array for MDP ////////////////////
// var kidArr = [{
// 	name: "",
// 	age: "",
// 	screenBal: 60,
// 	allowence: .10,
// 	monBal: 0.00,
// 	monReqst: 0,
// 	moneyHist: [],
// }]

////////////////// Retrieve local storage /////////////
// Pull Screen balance from local storage
if (localStorage.getItem("kid1ScreenBal") !== null) {
	kid1ScreenBal = JSON.parse(localStorage.getItem("kid1ScreenBal"));
}

// get kid1MoneyHist from local storage
if (localStorage.getItem("kid1MoneyHist") !== null) {
	kid1MoneyHist = JSON.parse(localStorage.getItem("kid1MoneyHist"));
}

// Pull money request from local storage
if (localStorage.getItem("kid1MonReqst") !== null) {
	kid1MonReqst = JSON.parse(localStorage.getItem("kid1MonReqst"));
}


////////////// Refresh local storage/display ////////////
function kid1RefreshBalances() {
	// Allowence rate
	$('.kid1Allowence').html("Allowence Rate: $" + kid1Allowence * 60 + "/hour");

	// Money balance
	kid1MonBal = kid1ScreenBal * kid1Allowence;
	$('.kid1MonBal').html("Available Money: $" + (kid1MonBal).toFixed(2));

	// Screen balance
	$('.kid1ScreenBal').html("Screen Balance: " + kid1ScreenBal);
	// console.log(moment(kid1ScreenBal * 60 * 1000).format('h:mm:ss'));

	// Local storage current screentime balance
	localStorage.setItem("kid1ScreenBal", kid1ScreenBal);

	// Local storage Money request total
	$('.kid1MonReqst').html("Money request $" + kid1MonReqst);
	localStorage.setItem("kid1MonReqst", kid1MonReqst);

	// Local storage set money withdrawal history. if working, delete in 4 locations within functions
	localStorage.setItem("kid1MoneyHist", JSON.stringify(kid1MoneyHist))
}


/////////////////// Stats/parents portal ////////////////

// TODO: View graph/history 
//// moment.js

// Clock 
function update() {
	$('.clock').html(moment().format('MMMM DD YYYY H:mm:ss'));
}
setInterval(update, 1000);

////// Create local storage of pay history AJS




// pay kid custom amount 
$(".payKid1Btn").on("click", function () {

	// Check balance available
	if (JSON.parse($(this).prev().val()) >= kid1MonBal) {
		alert("Balance available: $" + kid1MonBal + ". Please choose another amount")

	} else {
		// Check if date already exists in history
		if (kid1MoneyHist.includes(moment().format('YYYYMMDD')) === true) {
			// Get current date index from history
			var indexDate = kid1MoneyHist.indexOf(moment().format('YYYYMMDD'));

			// Add new value to existing value
			kid1MoneyHist.splice(indexDate + 1, 1, JSON.stringify(parseInt(kid1MoneyHist[indexDate + 1]) + JSON.parse($(this).prev().val())));

			// Reduce available balance
			kid1ScreenBal = (kid1ScreenBal - (JSON.parse($(this).prev().val())) / kid1Allowence)
			// Commit new value to storage
			// localStorage.setItem("kid1MoneyHist", JSON.stringify(kid1MoneyHist))
		} else {
			// If date is not in history, add new date and value
			kid1MoneyHist.push(moment().format('YYYYMMDD'));
			kid1MoneyHist.push($(this).prev().val());

			// Reduce available balance
			kid1ScreenBal = (kid1ScreenBal - (JSON.parse($(this).prev().val())) / kid1Allowence)

			// Commit new value to storage
			// localStorage.setItem("kid1MoneyHist", JSON.stringify(kid1MoneyHist))
		}

		// Update kid1ScreenBal
		if (JSON.parse($(this).prev().val()) >= kid1MonReqst) {

			kid1MonReqst = 0;
		} else {
			kid1MonReqst = kid1MonReqst - JSON.parse($(this).prev().val());
			kid1ScreenBal = kid1ScreenBal - (JSON.parse($(this).prev().val()) / kid1Allowence);
		}
		// localStorage.setItem("kid1ScreenBal", JSON.stringify(kid1ScreenBal));
		kid1RefreshBalances();
	}
});

// pay kid all requested 
$(".payKid1AllBtn").on("click", function () {

	// Check if date already exists in history
	if (kid1MoneyHist.includes(moment().format('YYYYMMDD')) === true) {
		// Get current date index from history
		var indexDate = kid1MoneyHist.indexOf(moment().format('YYYYMMDD'));

		// Add new value to existing value
		kid1MoneyHist.splice(indexDate + 1, 1, JSON.stringify(parseInt(kid1MoneyHist[indexDate + 1]) + kid1MonBal));

		// localStorage.setItem("kid1MoneyHist", JSON.stringify(kid1MoneyHist))
	} else {
		// If date is not in history, add new date and value
		kid1MoneyHist.push(moment().format('YYYYMMDD'));
		kid1MoneyHist.push(kid1MonBal);
		// localStorage.setItem("kid1MoneyHist", JSON.stringify(kid1MoneyHist))
	}

	// Update kid1ScreenBal
	kid1MonReqst = 0;
	kid1ScreenBal = 0;
	kid1RefreshBalances();
});


// Add time/money
$(".kid1AddTimeBtn").click(function () {

	kid1ScreenBal = kid1ScreenBal + 15;
	kid1RefreshBalances();
})

// Deduct time/money
$(".kid1DeductTimeBtn").click(function () {

	if (kid1ScreenBal >= 15) {

		kid1ScreenBal = kid1ScreenBal - 15;
		kid1RefreshBalances();
	} else {
		kid1ScreenBal = 0;
		alert("There is less than 15 minutes remaining. The balance is set to 0")
	}
})




/////////////////// Kids page /////////////////
// TODO: Edit/customize styles LH


    // insert class for saveBtn
    var saveBtn = $(".saveBtn");
    // insert value for name text box
    // var name = $("");
    // insert value for age text box
    // var age = $("");
    // insert value for background input
    
	var searchInput = $(".searchInput"); 
	var searchBtn = $("");
	var queryURL = "https://api.unsplash.com/search/photos?query=" + searchInput + "&client_id=e95ecaea5f2f22854ddc21c0f047145e88a13a1759d8a88737ec5affafc9ead4";
	
    var kid1ImgURL = "";
	var kid2ImgURL = "";
	searchBtn.on("click", function(){
		console.log(searchInput);
	})

	$(document).ready(function(){
		$.ajax({
			allRoutes: true,
			url: queryURL,
			method: "GET"
		}).then(function(response) {
			
			
			console.log(response.results[0].urls.thumb);
			var imageHolder = $(".kid-background-image");
			// var searchImage = $("<img>");
			
			imageHolder.attr("src", (response.results[0].urls.thumb));
			// imageHolder.append(imageHolder);
			kid1ImgURL = response.results[0].urls.thumb;
			
		});
	});
	
	if (localStorage.getItem("kid1ImgURL") !== null) {
		kid1ImgURL = (localStorage.getItem("kid1ImgURL"));
	}
	// if (localStorage.getItem("kid2ImgURL") !== null) {
	// 	kid2ImgURL = (localStorage.getItem("kid2ImgURL"));
	// }

	saveBtn.on("click", function (){
		localStorage.setItem("kid1ImgURL", (kid1ImgURL))

		// localStorage.setItem("kid2ImgURL", (kid2ImgURL))
		
	});


///// TODO: modal popout 

//  Start/stop time AJS
////  Update local storage 
// Set the clock

// Play/pause button
var kid1play = false;
$(".kid1PlayPause").on("click", function () {

	if (kid1play === true) {
		kid1play = false;
		stopTimer();
	} else {
		kid1play = true;
		startTimer();
	}
});

// Timer start
function startTimer() {
	myInterval = setInterval(function () {
		if (kid1ScreenBal >= 0) {
			kid1ScreenBal = (kid1ScreenBal - 0.01667).toFixed(3);

			kid1RefreshBalances();
		} else {
			// Stop timer if time runs out.
			clearInterval(myInterval)
			alert("You are out of screen time. Be productive to earn more time/money")
		}

	}, 1000);
}

// Timer stop
function stopTimer() {
	clearInterval(myInterval);
}

//// TODO: API Youtube LH
// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;

function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
		height: '390',
		width: '640',
		videoId: '_UVhAWP83TM',
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
	event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;

function onPlayerStateChange(event) {
	if (event.data == YT.PlayerState.PLAYING && !done) {
		// setTimeout(stopVideo, 6000);
		done = true;
	}
}

function stopVideo() {
	player.stopVideo();
}
////// TODO: MVP static video URL request
////// TODO: MDP dynamic search 

//  Request money AJS




// Money request 
$(".kid1MonReqstBtn").click(function () {

	if ($(this).prev().val() > kid1MonBal) {
		alert("You only have $" + kid1MonBal + " You can do more chores to save up.")
	} else {
		kid1MonReqst = kid1MonReqst + JSON.parse($(this).prev().val())

		kid1RefreshBalances();
	}
})

$(".kid1MonReqstAllBtn").click(function () {

	kid1MonReqst = kid1MonBal

	kid1RefreshBalances();

})

/////////////////// Modal edit form /////////////////
// TODO: Change name, age 
//// TODO: Local storage AJS

//// TODO: Display

// TODO: Change theme style LH
//// TODO: Trigger: button click 
//// TODO: Store preference
// MOVED TO TOP//// var kid1Theme;
// var kid2Theme; 

//// TODO: Append class to divs


// TODO: Change background LH
//// TODO: API unsplash

kid1RefreshBalances();




///////////////////////////////////////////////////////////////////////
////////////////////                    ///////////////////////////////
////////////////////       KID 2        ///////////////////////////////
////////////////////                    ///////////////////////////////
///////////////////////////////////////////////////////////////////////

/////////////////// Home page /////////////////////////
// TODO: MDP Add kid 
// TODO: Go to parent portal stats.html
// TODO: Go to kids page kid.html
// TODO: PARKING LOT Login 



//////////////////// Global variables////////////////// 
var kid2ScreenBal = 60;
var kid2Allowence = .10;
var kid2MonBal = 0.00;
var kid2MonReqst = 0;
var kid2MoneyHist = [];
var kid2Info = ("name", "age")

//////////////// Testing object array for MDP ////////////////////
// var kidArr = [{
// 	name: "",
// 	age: "",
// 	screenBal: 60,
// 	allowence: .10,
// 	monBal: 0.00,
// 	monReqst: 0,
// 	moneyHist: [],
// }]

////////////////// Retrieve local storage /////////////
// Pull Screen balance from local storage
if (localStorage.getItem("kid2ScreenBal") !== null) {
	kid2ScreenBal = JSON.parse(localStorage.getItem("kid2ScreenBal"));
}

// get kid2MoneyHist from local storage
if (localStorage.getItem("kid2MoneyHist") !== null) {
	kid2MoneyHist = JSON.parse(localStorage.getItem("kid2MoneyHist"));
}

// Pull money request from local storage
if (localStorage.getItem("kid2MonReqst") !== null) {
	kid2MonReqst = JSON.parse(localStorage.getItem("kid2MonReqst"));
}


////////////// Refresh local storage/display ////////////
function kid2RefreshBalances() {
	// Allowence rate
	$('.kid2Allowence').html("Allowence Rate: $" + kid2Allowence * 60 + "/hour");

	// Money balance
	kid2MonBal = kid2ScreenBal * kid2Allowence;
	$('.kid2MonBal').html("Available Money: $" + (kid2MonBal).toFixed(2));

	// Screen balance
	$('.kid2ScreenBal').html("Screen Balance: " + kid2ScreenBal);
	// console.log(moment(kid2ScreenBal * 60 * 1000).format('h:mm:ss'));

	// Local storage current screentime balance
	localStorage.setItem("kid2ScreenBal", kid2ScreenBal);

	// Local storage Money request total
	$('.kid2MonReqst').html("Money request $" + kid2MonReqst);
	localStorage.setItem("kid2MonReqst", kid2MonReqst);

	// Local storage set money withdrawal history. if working, delete in 4 locations within functions
	localStorage.setItem("kid2MoneyHist", JSON.stringify(kid2MoneyHist))
}


/////////////////// Stats/parents portal ////////////////

// TODO: View graph/history 
//// moment.js

////// Create local storage of pay history AJS




// pay kid custom amount 
$(".payKid2Btn").on("click", function () {

	// Check balance available
	if (JSON.parse($(this).prev().val()) >= kid2MonBal) {
		alert("Balance available: $" + kid2MonBal + ". Please choose another amount")

	} else {
		// Check if date already exists in history
		if (kid2MoneyHist.includes(moment().format('YYYYMMDD')) === true) {
			// Get current date index from history
			var indexDate = kid2MoneyHist.indexOf(moment().format('YYYYMMDD'));

			// Add new value to existing value
			kid2MoneyHist.splice(indexDate + 1, 1, JSON.stringify(parseInt(kid2MoneyHist[indexDate + 1]) + JSON.parse($(this).prev().val())));

			// Reduce available balance
			kid2ScreenBal = (kid2ScreenBal - (JSON.parse($(this).prev().val())) / kid2Allowence)
			// Commit new value to storage
			// localStorage.setItem("kid2MoneyHist", JSON.stringify(kid2MoneyHist))
		} else {
			// If date is not in history, add new date and value
			kid2MoneyHist.push(moment().format('YYYYMMDD'));
			kid2MoneyHist.push($(this).prev().val());

			// Reduce available balance
			kid2ScreenBal = (kid2ScreenBal - (JSON.parse($(this).prev().val())) / kid2Allowence)

			// Commit new value to storage
			// localStorage.setItem("kid2MoneyHist", JSON.stringify(kid2MoneyHist))
		}

		// Update kid2ScreenBal
		if (JSON.parse($(this).prev().val()) >= kid2MonReqst) {

			kid2MonReqst = 0;
		} else {
			kid2MonReqst = kid2MonReqst - JSON.parse($(this).prev().val());
			kid2ScreenBal = kid2ScreenBal - (JSON.parse($(this).prev().val()) / kid2Allowence);
		}
		// localStorage.setItem("kid2ScreenBal", JSON.stringify(kid2ScreenBal));
		kid2RefreshBalances();
	}
});

// pay kid all requested 
$(".payKid2AllBtn").on("click", function () {

	// Check if date already exists in history
	if (kid2MoneyHist.includes(moment().format('YYYYMMDD')) === true) {
		// Get current date index from history
		var indexDate = kid2MoneyHist.indexOf(moment().format('YYYYMMDD'));

		// Add new value to existing value
		kid2MoneyHist.splice(indexDate + 1, 1, JSON.stringify(parseInt(kid2MoneyHist[indexDate + 1]) + kid2MonBal));

		// localStorage.setItem("kid2MoneyHist", JSON.stringify(kid2MoneyHist))
	} else {
		// If date is not in history, add new date and value
		kid2MoneyHist.push(moment().format('YYYYMMDD'));
		kid2MoneyHist.push(kid2MonBal);
		// localStorage.setItem("kid2MoneyHist", JSON.stringify(kid2MoneyHist))
	}

	// Update kid2ScreenBal
	kid2MonReqst = 0;
	kid2ScreenBal = 0;
	kid2RefreshBalances();
});


// Add time/money
$(".kid2AddTimeBtn").click(function () {

	kid2ScreenBal = kid2ScreenBal + 15;
	kid2RefreshBalances();
})

// Deduct time/money
$(".kid2DeductTimeBtn").click(function () {

	if (kid2ScreenBal >= 15) {

		kid2ScreenBal = kid2ScreenBal - 15;
		kid2RefreshBalances();
	} else {
		kid2ScreenBal = 0;
		alert("There is less than 15 minutes remaining. The balance is set to 0")
	}
})




/////////////////// Kids page /////////////////
// TODO: Edit/customize styles LH

// insert class for saveBtn
// var saveBtn = $("");
// saveBtn.on("click", function (){
// insert value for name text box
// var name = $("");
// insert value for age text box
// var age = $("");
// insert value for background input

var searchInput = "dogs";
var queryURL = "https://api.unsplash.com/?query=" + searchInput + "&client_id=e95ecaea5f2f22854ddc21c0f047145e88a13a1759d8a88737ec5affafc9ead4";

$.ajax({
	allRoutes: true,
	url: queryURL,
	method: "GET"
}).then(function (response) {
	console.log(response);

});
// });


///// TODO: modal popout 

//  Start/stop time AJS
////  Update local storage 
// Set the clock

// kid2Play/pause button
var kid2play = false;
$(".kid2PlayPause").on("click", function () {

	if (kid2play === true) {
		kid2play = false;
		stopTimer();
	} else {
		kid2play = true;
		startTimer();
	}
});

// Timer start
function startTimer() {
	myInterval = setInterval(function () {
		if (kid2ScreenBal >= 0) {
			kid2ScreenBal = (kid2ScreenBal - 0.01667).toFixed(3);

			kid2RefreshBalances();
		} else {
			// Stop timer if time runs out.
			clearInterval(myInterval)
			alert("You are out of screen time. Be productive to earn more time/money")
		}

	}, 1000);
}

// Timer stop
function stopTimer() {
	clearInterval(myInterval);
}

//// TODO: API Youtube LH
// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;

function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
		height: '390',
		width: '640',
		videoId: '_UVhAWP83TM',
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
	event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;

function onPlayerStateChange(event) {
	if (event.data == YT.PlayerState.PLAYING && !done) {
		// setTimeout(stopVideo, 6000);
		done = true;
	}
}

function stopVideo() {
	player.stopVideo();
}
////// TODO: MVP static video URL request
////// TODO: MDP dynamic search 

//  Request money AJS




// Money request 
$(".kid2MonReqstBtn").click(function () {

	if ($(this).prev().val() > kid2MonBal) {
		alert("You only have $" + kid2MonBal + " You can do more chores to save up.")
	} else {
		kid2MonReqst = kid2MonReqst + JSON.parse($(this).prev().val())

		kid2RefreshBalances();
	}
})

$(".kid2MonReqstAllBtn").click(function () {

	kid2MonReqst = kid2MonBal

	kid2RefreshBalances();

})

/////////////////// Modal edit form /////////////////
// TODO: Change name, age 
//// TODO: Local storage AJS

//// TODO: Display

// TODO: Change theme style LH
//// TODO: Trigger: button click 
//// TODO: Store preference
// MOVED TO TOP//// var kid2Theme;
// var kid2Theme; 

//// TODO: Append class to divs


// TODO: Change background LH
//// TODO: API unsplash

kid2RefreshBalances();
