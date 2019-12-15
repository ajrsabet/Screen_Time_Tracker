/////////////////// Home page /////////////////////////
// TODO: MDP Add kid 
// TODO: Go to parent portal stats.html
// TODO: Go to kids page kid.html
// TODO: PARKING LOT Login 



/////////////////// Stats/parents portal /////////////////
// Pull kid balance from local storage 
var kid1ScreenBal = 60;
var kid1Allowence = .10;
var kid1MonBal = 0.00;

// Pull from local storage
if (localStorage.getItem("kid1ScreenBal") !== null) {
	kid1ScreenBal = JSON.parse(localStorage.getItem("kid1ScreenBal"));
	refreshBallances();
}

// View kids balances AJS
// Refresh balances displayed on screen
function refreshBallances() {
	// Allowence rate
	$('.kid1Allowence').html("Allowence Rate: $" + kid1Allowence * 60 + "/hour");
	// Money balance
	kid1MonBal = (kid1ScreenBal * kid1Allowence).toFixed(2);
	$('.kid1MonBal').html("Available Money: $" + kid1MonBal);
	// Screen balance
	$('.kid1ScreenBal').html("Screen Balance: " + kid1ScreenBal);
	console.log(moment(kid1ScreenBal*60*1000).format('hh:mm:ss'));
	// Money request
	$('.kid1MonReqst').html("Money request $" + kid1MonReqst);
}


// TODO: View graph/history 
//// moment.js

// Set the clock
// var clock = $('#clock'); //// use if clock display needed ////
function update() {
	$('.clock').html(moment().format('MMMM DD YYYY H:mm:ss'));
	// console.log(moment().format('MMMM DD YYYY H:mm:ss'));

}
setInterval(update, 1000);
// var date = moment("12/25/1995", "MM-DD-YYYY");
// console.log(moment().format('YYMMDD'));



////// Create local storage of pay history AJS
var kid1MoneyHist = [];
var kid2MoneyHist = [];

// get kid1MoneyHist from local storage
if (localStorage.getItem("kid1MoneyHist") !== null) {
	kid1MoneyHist = JSON.parse(localStorage.getItem("kid1MoneyHist"));
}

// pay kid to update pay history 
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

			// Commit new value to storage
			localStorage.setItem("kid1MoneyHist", JSON.stringify(kid1MoneyHist))

		} else {
			// If date is not in history, add new date and value
			kid1MoneyHist.push(moment().format('YYYYMMDD'));
			kid1MoneyHist.push($(this).prev().val());
			// Commit new value to storage
			localStorage.setItem("kid1MoneyHist", JSON.stringify(kid1MoneyHist))
		}

		// Update kid1ScreenBal
		kid1MonReqst = kid1MonReqst - JSON.parse($(this).prev().val());
		kid1ScreenBal = kid1ScreenBal - (JSON.parse($(this).prev().val()) / kid1Allowence);

		localStorage.setItem("kid1ScreenBal", JSON.stringify(kid1ScreenBal));

		refreshBallances();
	}
});


// TODO: Add time/money AJS
//// TODO: update Local storage



// TODO: Payout request confirmation
//// TODO: Update local storage (balance decrease, request = 0)




/////////////////// Kids page /////////////////
// TODO: Edit/customize styles LH
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
			localStorage.setItem("kid1ScreenBal", kid1ScreenBal);
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



// var time = kid1ScreenBal*60;
// var duration = moment.duration(time * 1000, 'milliseconds');
// var interval = 1000;


// setInterval(function(){
//   duration = moment.duration(duration.asMilliseconds() - interval, 'milliseconds');
//   //show how many hours, minutes and seconds are left
//   $('.kid1ScreenBalanace').text(moment(duration.asMilliseconds()).format('h:mm:ss'));
// }, interval);



//// TODO: API Youtube LH
////// TODO: MVP static video URL request
////// TODO: MDP dynamic search 

// TODO: Request money AJS
//// TODO: Update local storage
var kid1MonReqst = 0;
var kid2MonReqst = 0;

// Pull from local storage
if (localStorage.getItem("kid1MonReqst") !== null) {
	kid1MonReqst = JSON.parse(localStorage.getItem("kid1MonReqst"));
	console.log(kid1MonReqst);
	refreshBallances()
}


$(".kid1MonReqstBtn").click(function () {
	if (JSON.parse($(this).prev().val()) > kid1MonBal) {
		alert("You only have $" + kid1MonBal + " You can do more chores to save up.")
	} else {
		console.log(kid1MonReqst);

		kid1MonReqst = kid1MonReqst + JSON.parse($(this).prev().val())
		console.log(kid1MonReqst);

		localStorage.setItem("kid1MonReqst", kid1MonReqst);
		refreshBallances();
	}
})

/////////////////// Modal edit form /////////////////
// TODO: Change name, age 
//// TODO: Local storage AJS
var kid1Info = ("name", "age")
var kid2Info = ("name", "age")
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