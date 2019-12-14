/////////////////// Home page /////////////////////////
// TODO: MDP Add kid 
// TODO: Go to parent portal stats.html
// TODO: Go to kids page kid.html
// TODO: PARKING LOT Login 



/////////////////// Stats/parents portal /////////////////
// TODO: View kids balances AJS
//// TODO: Pull local storage 
var kid1Ballance;
var kid2Ballance;
// TODO: View graph/history 
//// moment.js

// Set the clock
// var clock = $('#clock'); //// use if clock display needed ////
function update() {
	$('#clock').html(moment().format('MMMM DD YYYY H:mm:ss'));
	// console.log(moment().format('MMMM DD YYYY H:mm:ss'));
}
setInterval(update, 1000);
var date = moment("12/25/1995", "MM-DD-YYYY");
// console.log(moment().format('YYMMDD'));



////// Create local storage of pay history AJS
var kid1MoneyHist = [];
var kid2MoneyHist = [];

if (localStorage.getItem("kid1MoneyHist") !== null) {
	kid1MoneyHist = localStorage.getItem("kid1MoneyHist");
	// console.log((kid1MoneyHist));
}

// 
$(".payKid1Btn").on("click", function () {
	if (kid1MoneyHist.includes(moment().format('YYYYMMDD')) === true) {
		// console.log("Date already in array");
		// console.log(kid1MoneyHist);
		var indexDate = kid1MoneyHist.indexOf(moment().format('YYYYMMDD'));
				
		kid1MoneyHist.splice(indexDate + 1,1, JSON.stringify(parseInt(kid1MoneyHist[indexDate + 1]) + JSON.parse($(this).prev().val())));
		
		localStorage.setItem("kid1MoneyHist", JSON.stringify(kid1MoneyHist))
		
		// console.log(kid1MoneyHist);

	} else {
		// console.log("not in array");
		kid1MoneyHist.push(moment().format('YYYYMMDD'));
		kid1MoneyHist.push($(this).prev().val());
		// console.log(kid1MoneyHist);
		localStorage.setItem("kid1MoneyHist", JSON.stringify(kid1MoneyHist))
	}

});


// TODO: Add time/money AJS
//// TODO: update Local storage

// TODO: Payout request confirmation
//// TODO: Update local storage (balance decrease, request = 0)




/////////////////// Kids page /////////////////
// TODO: Edit/customize styles LH
///// TODO: modal popout 

// TODO: Start/stop time AJS
//// TODO: Update local storage (per minute)


//// TODO: API Youtube LH
////// TODO: MVP static video URL request
////// TODO: MDP dynamic search 

// TODO: Request money AJS
//// TODO: Update local storage
var kid1MoneyRequest;
var kid2MoneyRequest;

if (localStorage.getItem("kid1MoneyHist") !== null) {
	kid1MoneyHist = JSON.parse(localStorage.getItem("kid1MoneyHist"));
	console.log((kid1MoneyHist));
}

$(".kid1MoneyRequestBtn").click(function () {
	kid1MoneyRequest = $(this).prev().val();
	kid1MoneyRequestDate = moment().format('MMMM DD YYYY H:mm')
	localStorage.setItem("kid1MoneyRequest", (kid1MoneyRequest));
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