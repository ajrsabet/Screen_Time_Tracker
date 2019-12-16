/////////////////// Home page /////////////////////////
// TODO: MDP Add kid 
// TODO: Go to parent portal stats.html
// TODO: Go to kids page kid.html
// TODO: PARKING LOT Login 



//////////////////// Global variables////////////////// 
var kid1ScreenBal = 60;
var kid1Allowence = .10;
var kid1MonBal = 0.00;
var kid1MonReqst = 0;
var kid1MoneyHist = [];
var kid1Info = ("name", "age")

//////////////// Testing object array for MDP ////////////////////
// var kidArr = [

// 	{ name : "",
// 		age : "" ,
// 		screenBal : 60,
// 		 allowence : .10,
// 		 monBal : 0.00,
// 		 monReqst : 0,
// 		 moneyHist : [],
// 		 moneyDate : [],
// 		}
// ]

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
function refreshBallances() {
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
		refreshBallances();
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
		refreshBallances();
});


// Add time/money
$(".kid1AddTimeBtn").click(function () {
	
	kid1ScreenBal = kid1ScreenBal + 15;
	refreshBallances();
})

// Deduct time/money
$(".kid1DeductTimeBtn").click(function () {
	
	if (kid1ScreenBal >= 15) {

		kid1ScreenBal = kid1ScreenBal - 15;
		refreshBallances();
	} else {
		kid1ScreenBal = 0;
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
  }).then(function(response) {
    console.log(response);
    
  });
// });


///// TODO: modal popout 

//  Start/stop time AJS
////  Update local storage 
// Set the clock

// Play/pause button
var play = false;
$(".playPause").on("click", function () {
	
	if (play === true) {
		play = false;
		stopTimer();
	} else {
		play = true;
		startTimer();
	}
});

// Timer start
function startTimer() {
	myInterval = setInterval(function () {
		if (kid1ScreenBal >= 0) {
			kid1ScreenBal = (kid1ScreenBal - 0.01667).toFixed(3);

			refreshBallances();
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
		
		refreshBallances();
	}
})

$(".kid1MonReqstAllBtn").click(function () {
	
		kid1MonReqst = kid1MonBal

		refreshBallances();
	
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

refreshBallances();