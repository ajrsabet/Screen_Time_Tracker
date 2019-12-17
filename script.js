/////////////////// Materialize JS /////////////////////////
$(document).ready(function () {
	$(".dropdown-trigger").dropdown();
	player.stopVideo();
})

/////////////////// Home page /////////////////////////
// TODO: PARKING LOT Add kid dynamically
// TODO: PARKING LOT Login 


//////////////////// local storage variables////////////////// 

var kidArr = [{
	Name: "",
	Age: "",
	Theme: "",
	ScreenBal: 0,
	Allowence: .10,
	MonBal: 0.00,
	MonReqst: 0,
	MoneyHist: [],
	ImgURL: "",
}, {
	Name: "",
	Age: "",
	Theme: "",
	ScreenBal: 0,
	Allowence: .10,
	MonBal: 0.00,
	MonReqst: 0,
	MoneyHist: [],
	ImgURL: "",
}]

var ThemeArr = ["pink", "blue", "orange", "black"]

if (localStorage.getItem("kidArr") !== null) {
	kidArr = JSON.parse(localStorage.getItem("kidArr"));
}

////////////// Refresh local storage/display ////////////
function kid1Refresh() {
	// Allowence rate
	$('.kid1Allowence').html("Allowence Rate: $" + kidArr[0].Allowence * 60 + "/hour");

	// Money balance
	kidArr[0].MonBal = ((kidArr[0].ScreenBal / 60) * kidArr[0].Allowence / 1000).toFixed(2);
	$('.kid1MonBal').html("Available Money: $" + (kidArr[0].MonBal));

	// Screen balance
	$('.kid1ScreenBal').html("Screen Balance: " + (moment(kidArr[0].ScreenBal + (8 * 60 * 60 * 1000)).format('HH:mm:ss')));

	$('.kid1MonReqst').html("Pay pending allowence request of: $" + (kidArr[0].MonReqst).toFixed(2));

	$('.kid1Name').html(kidArr[0].Name);
	
	// Local storage Money request total////////////
	localStorage.setItem("kidArr", JSON.stringify(kidArr));
}


/////////////////// Stats/parents portal ////////////////

// TODO: PARKING LOT pay kid custom amount WORKING JUST UN_COMMENT AND ADD BUTTON 
// $(".payKid1Btn").on("click", function () {

// 	// Check balance available
// 	if (JSON.parse($(this).prev().val()) >= kidArr[0].MonBal) {
// 		alert("Balance available: $" + kidArr[0].MonBal + ". Please choose another amount")

// 	} else {
// 		// Check if date already exists in history
// 		if (kidArr[0].MoneyHist.includes(moment().format('YYYYMMDD')) === true) {
// 			// Get current date index from history
// 			var indexDate = kidArr[0].MoneyHist.indexOf(moment().format('YYYYMMDD'));

// 			// Add new value to existing value
// 			kidArr[0].MoneyHist.splice(indexDate + 1, 1, JSON.stringify(parseInt(kidArr[0].MoneyHist[indexDate + 1]) + JSON.parse($(this).prev().val())));

// 			// Reduce available balance
// 			kidArr[0].ScreenBal = (kidArr[0].ScreenBal - (JSON.parse($(this).prev().val())) / kidArr[0].Allowence)

// 		} else {
// 			// If date is not in history, add new date and value
// 			kidArr[0].MoneyHist.push(moment().format('YYYYMMDD'));
// 			kidArr[0].MoneyHist.push($(this).prev().val());

// 			// Reduce available balance
// 			kidArr[0].ScreenBal = (kidArr[0].ScreenBal - (JSON.parse($(this).prev().val())) / kidArr[0].Allowence)

// 		}

// 		// Update kidArr[0].ScreenBal
// 		if (JSON.parse($(this).prev().val()) >= kidArr[0].MonReqst) {

// 			kidArr[0].MonReqst = 0;
// 		} else {
// 			kidArr[0].MonReqst = kidArr[0].MonReqst - JSON.parse($(this).prev().val());
// 			kidArr[0].ScreenBal = kidArr[0].ScreenBal - (JSON.parse($(this).prev().val()) / kidArr[0].Allowence);
// 		}
// 		kid1Refresh();
// 	}
// });

// pay kid all requested 
$(".payKid1AllBtn").on("click", function () {

	// Check if date already exists in history
	if (kidArr[0].MoneyHist.includes(moment().format('YYYYMMDD')) === true) {
		// Get current date index from history
		var indexDate = kidArr[0].MoneyHist.indexOf(moment().format('YYYYMMDD'));

		// Add new value to existing value
		kidArr[0].MoneyHist.splice(indexDate + 1, 1, JSON.stringify(parseInt(kidArr[0].MoneyHist[indexDate + 1]) + kidArr[0].MonBal));

	} else {
		// If date is not in history, add new date and value
		kidArr[0].MoneyHist.push(moment().format('YYYYMMDD'));
		kidArr[0].MoneyHist.push(kidArr[0].MonBal);
	}

	// Update kidArr[0].ScreenBal
	kidArr[0].MonReqst = 0;
	kidArr[0].ScreenBal = 0;
	kid1Refresh();
});


// Add time/money
$(".kid1AddTimeBtn").click(function () {

	kidArr[0].ScreenBal = kidArr[0].ScreenBal + (15 * 60 * 1000);

	kid1Refresh();
})

// Deduct time/money
$(".kid1DeductTimeBtn").click(function () {

	if (kidArr[0].ScreenBal >= 15) {

		kidArr[0].ScreenBal = kidArr[0].ScreenBal - (15 * 60 * 1000);

		kid1Refresh();

	} else {
		kidArr[0].ScreenBal = 0;
		alert("There is less than 15 minutes remaining. The balance is set to 0")
	}
})

/////////////////// Kids page /////////////////

$(".imageSearch").on("submit", function (event) {
	event.preventDefault();

	// if (populated=true){
	// 	$(".imageHolder").empty();
	// 	populated = false
	// } else {

	var searchInput = $(".searchInput").val();
	// console.log(searchInput);
	
	var queryURL = "https://api.unsplash.com/search/photos?query=" + searchInput + "&client_id=e95ecaea5f2f22854ddc21c0f047145e88a13a1759d8a88737ec5affafc9ead4";
	$("kid-background-holder").empty();
	$.ajax({
		allRoutes: true,
		url: queryURL,
		method: "GET"
	}).then(function (response) {
		for (let i = 0; i <response.results.length; i++) {
			var imageData = response.results[i].urls.thumb;
			
			// console.log(imageData);
			var imageHolder = $(".kid-background-holder");
			var searchImage = $("<img>");
			
			searchImage.attr("src", (imageData));
			searchImage.attr("style", "margin=10px");
			searchImage.addClass("kid-background-image");
			searchImage.addClass("generatedImg");
			imageHolder.append(searchImage);

		}
		
		$(document).on("click", ".generatedImg", function(){
			// event.preventDefault();
			console.log(this.src);
			
			kidArr[0].ImgURL=$(this.src)
			kid1Refresh();
			
		});
	});
	// populated = true;
// }
});


///// TODO: PARKING LOT modal popout 

//  Start/stop time AJS
// Play/pause button
var kid1play = false;
$(".kid1PlayPause").on("click", function () {

	if (kid1play === true) {
		kid1play = false;
		kid1stopTimer();
		player.stopVideo();
	} else {
		kid1play = true;
		kid1startTimer();
		player.playVideo();
	}
});

// Timer start
function kid1startTimer() {
	myInterval = setInterval(function () {
		if (kidArr[0].ScreenBal >= 0) {
			kidArr[0].ScreenBal = kidArr[0].ScreenBal - 1000;

			kid1Refresh();
		} else {
			// Stop timer if time runs out.
			clearInterval(myInterval)
			alert("You are out of screen time. Be productive to earn more time/money")
		}

	}, 1000);
}

// Timer stop
function kid1stopTimer() {
	clearInterval(myInterval);
}

////// TODO: MDP dynamic filtered video search 


// Money request 
$(".kid1MonReqstBtn").click(function () {

	if ($(this).prev().val() > kidArr[0].MonBal) {
		alert("You only have $" + kidArr[0].MonBal + " You can do more chores to save up.")
	} else {
		kidArr[0].MonReqst = kidArr[0].MonReqst + JSON.parse($(this).prev().val())

		kid1Refresh();
	}
})

$(".kid1MonReqstAllBtn").click(function () {
	alert("You have just requested to be paid!");
	kidArr[0].MonReqst = kidArr[0].MonBal

	kid1Refresh();

})

/////////////////// Modal edit form /////////////////
// Change name, age 
$(".kid1SaveBtn").click(function () {
	if ($(".kid1Name").val !== null) {
		kidArr[0].Name = $(".kid1Name").val();
	}
	if ($(".kid1Age").val !== null) {
		kidArr[0].Age = $(".kid1Age").val();
	}
		kid1Refresh();
})

$(".spanCircleKidPurple").click(function () {
	kidArr[0].Theme = "purple"
	kid1Refresh();
	updateTheme();
	})

$(".spanCircleKidGreen").click(function () {
	kidArr[0].Theme = "green"
	kid1Refresh();
	updateTheme();
})

$(".spanCircleKidBlue").click(function () {
	kidArr[0].Theme = "blue"
	kid1Refresh();
	updateTheme();
})

$(".spanCircleKidYellow").click(function () {
	kidArr[0].Theme = "yellow"
	updateTheme();
	kid1Refresh();
})

function updateTheme() {
	var themeClassArr = [$(".green"),$(".blue"),$(".deep-purple"),$(".light-green"),$(".yellow")]
	for (let i = 0; i < themeClassArr.length; i++) {
			
	if (kidArr[0].Theme === "purple") {
		themeClassArr[i].removeClass('green light-green lighten-2 orange yellow blue lighten-1');
			themeClassArr[i].addClass('deep-purple lighten-3');

		} else if (kidArr[0].Theme === "green") {
			themeClassArr[i].removeClass('deep-purple lighten-3 orange yellow lighten-1');
			themeClassArr[i].addClass('light-green lighten-2');

		} else if (kidArr[0].Theme === "blue") {
			themeClassArr[i].removeClass('green deep-purple lighten-3 light-green lighten-2 yellow lighten-1');
			themeClassArr[i].addClass('blue lighten-2');

		} else if (kidArr[0].Theme === "yellow") {
			themeClassArr[i].removeClass('green deep-purple lighten-3 light-green lighten-2 orange');
			themeClassArr[i].addClass('yellow lighten-1');
		}
}
}


kid1Refresh();

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
////////////////////                    ///////////////////////////////
////////////////////       KID 2        ///////////////////////////////
////////////////////                    ///////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////


////////////// Refresh local storage/display ////////////
function kid2Refresh() {
	// Allowence rate
	$('.kid2Allowence').html("Allowence Rate: $" + kidArr[1].Allowence * 60 + "/hour");

	// Money balance
	kidArr[1].MonBal = ((kidArr[1].ScreenBal / 60) * kidArr[1].Allowence / 1000).toFixed(2);
	$('.kid2MonBal').html("Available Money: $" + (kidArr[1].MonBal));

	// Screen balance
	$('.kid2ScreenBal').html("Screen Balance: " + (moment(kidArr[1].ScreenBal + (8 * 60 * 60 * 1000)).format('HH:mm:ss')));

	$('.kid2MonReqst').html("Pay pending allowence request of: $" + (kidArr[1].MonReqst).toFixed(2));

	$('.kid2Name').html(kidArr[1].Name);
	
	// Local storage Money request total////////////
	localStorage.setItem("kidArr", JSON.stringify(kidArr));
}


/////////////////// Stats/parents portal ////////////////

// TODO: PARKING LOT pay kid custom amount WORKING JUST UN_COMMENT AND ADD BUTTON 
// $(".payKid2Btn").on("click", function () {

// 	// Check balance available
// 	if (JSON.parse($(this).prev().val()) >= kidArr[1].MonBal) {
// 		alert("Balance available: $" + kidArr[1].MonBal + ". Please choose another amount")

// 	} else {
// 		// Check if date already exists in history
// 		if (kidArr[1].MoneyHist.includes(moment().format('YYYYMMDD')) === true) {
// 			// Get current date index from history
// 			var indexDate = kidArr[1].MoneyHist.indexOf(moment().format('YYYYMMDD'));

// 			// Add new value to existing value
// 			kidArr[1].MoneyHist.splice(indexDate + 1, 1, JSON.stringify(parseInt(kidArr[1].MoneyHist[indexDate + 1]) + JSON.parse($(this).prev().val())));

// 			// Reduce available balance
// 			kidArr[1].ScreenBal = (kidArr[1].ScreenBal - (JSON.parse($(this).prev().val())) / kidArr[1].Allowence)

// 		} else {
// 			// If date is not in history, add new date and value
// 			kidArr[1].MoneyHist.push(moment().format('YYYYMMDD'));
// 			kidArr[1].MoneyHist.push($(this).prev().val());

// 			// Reduce available balance
// 			kidArr[1].ScreenBal = (kidArr[1].ScreenBal - (JSON.parse($(this).prev().val())) / kidArr[1].Allowence)

// 		}

// 		// Update kidArr[1].ScreenBal
// 		if (JSON.parse($(this).prev().val()) >= kidArr[1].MonReqst) {

// 			kidArr[1].MonReqst = 0;
// 		} else {
// 			kidArr[1].MonReqst = kidArr[1].MonReqst - JSON.parse($(this).prev().val());
// 			kidArr[1].ScreenBal = kidArr[1].ScreenBal - (JSON.parse($(this).prev().val()) / kidArr[1].Allowence);
// 		}
// 		kid2Refresh();
// 	}
// });

// pay kid all requested 
$(".payKid2AllBtn").on("click", function () {

	// Check if date already exists in history
	if (kidArr[1].MoneyHist.includes(moment().format('YYYYMMDD')) === true) {
		// Get current date index from history
		var indexDate = kidArr[1].MoneyHist.indexOf(moment().format('YYYYMMDD'));

		// Add new value to existing value
		kidArr[1].MoneyHist.splice(indexDate + 1, 1, JSON.stringify(parseInt(kidArr[1].MoneyHist[indexDate + 1]) + kidArr[1].MonBal));

	} else {
		// If date is not in history, add new date and value
		kidArr[1].MoneyHist.push(moment().format('YYYYMMDD'));
		kidArr[1].MoneyHist.push(kidArr[1].MonBal);
	}

	// Update kidArr[1].ScreenBal
	kidArr[1].MonReqst = 0;
	kidArr[1].ScreenBal = 0;
	kid2Refresh();
});


// Add time/money
$(".kid2AddTimeBtn").click(function () {

	kidArr[1].ScreenBal = kidArr[1].ScreenBal + (15 * 60 * 1000);

	kid2Refresh();
})

// Deduct time/money
$(".kid2DeductTimeBtn").click(function () {

	if (kidArr[1].ScreenBal >= 15) {

		kidArr[1].ScreenBal = kidArr[1].ScreenBal - (15 * 60 * 1000);

		kid2Refresh();

	} else {
		kidArr[1].ScreenBal = 0;
		alert("There is less than 15 minutes remaining. The balance is set to 0")
	}
})

/////////////////// Kids page /////////////////

$(".imageSearch").on("submit", function (event) {
	event.preventDefault();

	// if (populated=true){
	// 	$(".imageHolder").empty();
	// 	populated = false
	// } else {

	var searchInput = $(".searchInput").val();
	// console.log(searchInput);
	
	var queryURL = "https://api.unsplash.com/search/photos?query=" + searchInput + "&client_id=e95ecaea5f2f22854ddc21c0f047145e88a13a1759d8a88737ec5affafc9ead4";
	$("kid-background-holder").empty();
	$.ajax({
		allRoutes: true,
		url: queryURL,
		method: "GET"
	}).then(function (response) {
		for (let i = 0; i <response.results.length; i++) {
			var imageData = response.results[i].urls.thumb;
			
			// console.log(imageData);
			var imageHolder = $(".kid-background-holder");
			var searchImage = $("<img>");
			
			searchImage.attr("src", (imageData));
			searchImage.attr("style", "margin=10px");
			searchImage.addClass("kid-background-image");
			searchImage.addClass("generatedImg");
			imageHolder.append(searchImage);

		}
		
		$(document).on("click", ".generatedImg", function(){
			// event.preventDefault();
			console.log(this.src);
			
			kidArr[1].ImgURL=$(this.src)
			kid2Refresh();
			
		});
	});
	// populated = true;
// }
});


///// TODO: PARKING LOT modal popout 

//  Start/stop time AJS
// Play/pause button
var kid2play = false;
$(".kid2PlayPause").on("click", function () {

	if (kid2play === true) {
		kid2play = false;
		kid2stopTimer();
		player.stopVideo();
	} else {
		kid2play = true;
		kid2startTimer();
		player.playVideo();
	}
});

// Timer start
function kid2startTimer() {
	myInterval = setInterval(function () {
		if (kidArr[1].ScreenBal >= 0) {
			kidArr[1].ScreenBal = kidArr[1].ScreenBal - 1000;

			kid2Refresh();
		} else {
			// Stop timer if time runs out.
			clearInterval(myInterval)
			alert("You are out of screen time. Be productive to earn more time/money")
		}

	}, 1000);
}

// Timer stop
function kid2stopTimer() {
	clearInterval(myInterval);
}

////// TODO: MDP dynamic filtered video search 


// Money request 
$(".kid2MonReqstBtn").click(function () {

	if ($(this).prev().val() > kidArr[1].MonBal) {
		alert("You only have $" + kidArr[1].MonBal + " You can do more chores to save up.")
	} else {
		kidArr[1].MonReqst = kidArr[1].MonReqst + JSON.parse($(this).prev().val())

		kid2Refresh();
	}
})

$(".kid2MonReqstAllBtn").click(function () {
	alert("You have just requested to be paid!");
	kidArr[1].MonReqst = kidArr[1].MonBal

	kid2Refresh();

})

/////////////////// Modal edit form /////////////////
// Change name, age 
$(".kid2SaveBtn").click(function () {
	if ($(".kid2Name").val !== null) {
		kidArr[1].Name = $(".kid2Name").val();
	}
	if ($(".kid2Age").val !== null) {
		kidArr[1].Age = $(".kid2Age").val();
	}
		kid2Refresh();
})

$(".spanCircleKidPurple").click(function () {
	kidArr[1].Theme = "purple"
	kid2Refresh();
	updateTheme();
	})

$(".spanCircleKidGreen").click(function () {
	kidArr[1].Theme = "green"
	kid2Refresh();
	updateTheme();
})

$(".spanCircleKidBlue").click(function () {
	kidArr[1].Theme = "blue"
	kid2Refresh();
	updateTheme();
})

$(".spanCircleKidYellow").click(function () {
	kidArr[1].Theme = "yellow"
	updateTheme();
	kid2Refresh();
})

function updateTheme() {
	var themeClassArr = [$(".green"),$(".blue"),$(".deep-purple"),$(".light-green"),$(".yellow")]
	for (let i = 0; i < themeClassArr.length; i++) {
			
	if (kidArr[1].Theme === "purple") {
		themeClassArr[i].removeClass('green light-green lighten-2 orange yellow blue lighten-1');
			themeClassArr[i].addClass('deep-purple lighten-3');

		} else if (kidArr[1].Theme === "green") {
			themeClassArr[i].removeClass('deep-purple lighten-3 orange yellow lighten-1');
			themeClassArr[i].addClass('light-green lighten-2');

		} else if (kidArr[1].Theme === "blue") {
			themeClassArr[i].removeClass('green deep-purple lighten-3 light-green lighten-2 yellow lighten-1');
			themeClassArr[i].addClass('blue lighten-2');

		} else if (kidArr[1].Theme === "yellow") {
			themeClassArr[i].removeClass('green deep-purple lighten-3 light-green lighten-2 orange');
			themeClassArr[i].addClass('yellow lighten-1');
		}
}
}


kid2Refresh();

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////