/////////////////// Materialize JS /////////////////////////
$(document).ready(function () {
	$(".dropdown-trigger").dropdown();

})

//////////////////// local storage variables//////////////////

let kidID;

let kidArr = [{
	ID: 0,
	Name: "",
	Age: "",
	Theme: "",
	ScreenBal: 0,
	Allowence: .10,
	MonBal: 0.00,
	MonReqst: 0,
	PaidDate: [],
	MoneyPaid: [],
	ScreenDate: [],
	ScreenHist: [],
	ImgURL: "",
}, {
	ID: 1,
	Name: "",
	Age: "",
	Theme: "",
	ScreenBal: 0,
	Allowence: .10,
	MonBal: 0.00,
	MonReqst: 0,
	PaidDate: [],
	MoneyPaid: [],
	ScreenDate: [],
	ScreenHist: [],
	ImgURL: "",
}]

// Retrieve local storage
if (localStorage.getItem("kidArr") !== null) {
	kidArr = JSON.parse(localStorage.getItem("kidArr"));
}

if (localStorage.getItem("kidArr") !== null) {
	kidArr = JSON.parse(localStorage.getItem("kidArr"));
}

const ThemeArr = ["pink", "blue", "orange", "black"]


// function appendKidID() {
// 	if (kidID = 0) {
// 		$(".button").addClass('kidID0')
// 	} else if (kidID = 1) {
// 		$(".button").addClass('kidID1')

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
			console.log("blargh");
			
			console.log(this.src);
			
			kidArr[0].ImgURL=this.src
			// $(".body2").css("background-image", "url(" + this.src + ")");
			// $(".box").css("background-image", "url(" + imageUrl + ")");
			console.log($(".body2").css("background-image"));
			
			kid1Refresh();
			
		});
	});
	// populated = true;
// }

$(".kidID0").hover(function () {
	if (kidID !== 0) {
		kidID = 0
		console.log('kidID: ' + kidID);
	}
});
$(".kidID1").hover(function () {
	if (kidID !== 1) {
		kidID = 1
		console.log('kidID: ' + kidID);
	}
});


////////////// Refresh local storage/display ////////////

function kidRefresh() {
	updateTheme();
	// Allowence rate

	$('.kidAllowence.kidID' + kidID).html("Allowence Rate: $" + kidArr[kidID].Allowence * 60 + "/hour");

	// Money balance
	kidArr[kidID].MonBal = ((kidArr[kidID].ScreenBal / 60) * kidArr[kidID].Allowence / 1000).toFixed(2);
	$('.kidMonBal.kidID' + kidID).html("Available Money: $" + (kidArr[kidID].MonBal));

	// Screen balance
	$('.kidScreenBal.kidID' + kidID).html("Screen Balance: " + (moment(kidArr[kidID].ScreenBal + (8 * 60 * 60 * 1000)).format('HH:mm:ss')));

	if ((kidArr[kidID].MonReqst) > 0) {
		$('.kidMonReqst.kidID' + kidID).html("Allowence Requested: $" + (kidArr[kidID].MonReqst).toFixed(2));
	}

	$('.kidName.kidID' + kidID).html(kidArr[kidID].Name);

	// Local storage Money request total////////////
	localStorage.setItem("kidArr", JSON.stringify(kidArr));
}

// Display kid

for (let i = 0; i < kidArr.length; i++) {
	kidID = i;
	kidRefresh();
}


/////////////////// Stats/parents portal ////////////////

// TODO: PARKING LOT pay kid custom amount WORKING JUST UN_COMMENT AND ADD BUTTON. 
// TODO: Update variables, split moneyHist into 2 arrays
// $(".payKid1Btn").on("click", function () {

// 	// Check balance available
// 	if (JSON.parse($(this).prev().val()) >= kidArr[kidID].MonBal) {
// 		alert("Balance available: $" + kidArr[kidID].MonBal + ". Please choose another amount")

// 	} else {
// 		// Check if date already exists in history
// 		if (kidArr[kidID].MoneyPaid.includes(moment().format('MM/DD/YY')) === true) {
// 			// Get current date index from history
// 			var indexDate = kidArr[kidID].MoneyPaid.indexOf(moment().format('MM/DD/YY'));

// 			// Add new value to existing value
// 			kidArr[kidID].MoneyPaid.splice(indexDate + 1, 1, JSON.stringify(parseInt(kidArr[kidID].MoneyPaid[indexDate + 1]) + JSON.parse($(this).prev().val())));

// 			// Reduce available balance
// 			kidArr[kidID].ScreenBal = (kidArr[kidID].ScreenBal - (JSON.parse($(this).prev().val())) / kidArr[kidID].Allowence)

// 		} else {
// 			// If date is not in history, add new date and value
// 			kidArr[kidID].MoneyPaid.push(moment().format('MM/DD/YY'));
// 			kidArr[kidID].MoneyPaid.push($(this).prev().val());

// 			// Reduce available balance
// 			kidArr[kidID].ScreenBal = (kidArr[kidID].ScreenBal - (JSON.parse($(this).prev().val())) / kidArr[kidID].Allowence)

// 		}

// 		// Update kidArr[kidID].ScreenBal
// 		if (JSON.parse($(this).prev().val()) >= kidArr[kidID].MonReqst) {

// 			kidArr[kidID].MonReqst = 0;
// 		} else {
// 			kidArr[kidID].MonReqst = kidArr[kidID].MonReqst - JSON.parse($(this).prev().val());
// 			kidArr[kidID].ScreenBal = kidArr[kidID].ScreenBal - (JSON.parse($(this).prev().val()) / kidArr[kidID].Allowence);
// 		}
// 		kidRefresh();
// 	}
// });

// pay kid all requested 
$(".payKidAllBtn.kidID" + kidID).on("click", function () {

	// Check if date already exists in history
	if (kidArr[kidID].PaidDate.includes(moment().format('MM/DD/YY')) === true) {
		// Get current date index from history
		var indexDate = kidArr[kidID].PaidDate.indexOf(moment().format('MM/DD/YY'));

		// Add new value to existing value
		kidArr[kidID].MoneyPaid.splice(indexDate, 1, (JSON.parse(kidArr[kidID].MoneyPaid[indexDate]) + JSON.parse(kidArr[kidID].MonBal)));

	} else {
		// If date is not in history, add new date and value
		kidArr[kidID].PaidDate.push(moment().format('MM/DD/YY'));
		kidArr[kidID].MoneyPaid.push(kidArr[kidID].MonBal);

	}

	// Update kidArr[kidID].ScreenBal
	kidArr[kidID].MonReqst = 0;
	kidArr[kidID].ScreenBal = 0;
	kidRefresh();
});

// Add time/money
$(".kidAddTimeBtn").click(function () {
	console.log("add: " + kidID);

	kidArr[kidID].ScreenBal = kidArr[kidID].ScreenBal + (15 * 60 * 1000);

	kidRefresh();
})

// Deduct time/money
$(".kidDeductTimeBtn").click(function () {
	console.log("deduct: " + kidID);

	if (kidArr[kidID].ScreenBal >= 15) {

		kidArr[kidID].ScreenBal = kidArr[kidID].ScreenBal - (15 * 60 * 1000);

		kidRefresh();

	} else {
		kidArr[kidID].ScreenBal = 0;
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
		for (let i = 0; i < response.results.length; i++) {
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



		$(document).on("click", ".generatedImg", function () {
			// event.preventDefault();
			console.log(this.src);

			kidArr[kidID].ImgURL = $(this.src)
			kidRefresh();

		});
	});
	// populated = true;
	// }
});


///// TODO: PARKING LOT modal popout 

//  Start/stop time AJS
// Play/pause button
var player;
var kidplay = false;
$(".kidPlayPause").on("click", function () {

	if (kidplay === true) {
		kidplay = false;
		kidstopTimer();
		player.stopVideo();
	} else {
		kidplay = true;
		kidstartTimer();
		player.playVideo();
	}
});

// TODO: Timer start
function kidstartTimer() {
	myInterval = setInterval(function () {
		if (kidArr[kidID].ScreenBal >= 0) {
			kidArr[kidID].ScreenBal = kidArr[kidID].ScreenBal - 1000;
			// Check if date already exists in history
			if (kidArr[kidID].ScreenDate.includes(moment().format('MM/DD/YY')) === true) {
				// Get current date index from history
				var indexDate = kidArr[kidID].ScreenDate.indexOf(moment().format('MM/DD/YY'));

				// Add new value to existing value
				kidArr[kidID].ScreenHist.splice(indexDate, 1, (JSON.parse(kidArr[kidID].ScreenHist[indexDate]) + 1000));

			} else {
				// If date is not in history, add new date and value
				kidArr[kidID].ScreenDate.push(moment().format('MM/DD/YY'));
				kidArr[kidID].ScreenHist.push(kidArr[kidID].MonBal);
				if (!kidArr[kidID].ScreenHist[indexDate]) {
					// kidArr[kidID].ScreenHist.push(1);
				}
			}
			kidRefresh();
		} else {
			// Stop timer if time runs out.
			clearInterval(myInterval)
			stopVideo()
			kidArr[kidID].ScreenBal = 0;
			alert("You are out of screen time. Be productive to earn more time/money")
		}

	}, 1000);
}




//////////////
// Timer stop
function kidstopTimer() {
	clearInterval(myInterval);
}

////// TODO: MDP dynamic filtered video search 


// Money request 
$(".kidMonReqstBtn").click(function () {

	if ($(this).prev().val() > kidArr[kidID].MonBal) {
		alert("You only have $" + kidArr[kidID].MonBal + " You can do more chores to save up.")
	} else {
		kidArr[kidID].MonReqst = kidArr[kidID].MonReqst + JSON.parse($(this).prev().val())

		kidRefresh();
	}
})

$(".kidMonReqstAllBtn").click(function () {
	alert("You have just requested to be paid!");
	kidArr[kidID].MonReqst = kidArr[kidID].MonBal

	kidRefresh();

})

/////////////////// Modal edit form /////////////////
// Change name, age 
$(".kidSaveBtn").click(function () {
	if ($(".kidName.kidID" + kidID).val !== null) {
		kidArr[kidID].Name = $(".kidName").val();
	}
	if ($(".kidAge").val !== null) {
		kidArr[kidID].Age = $(".kidAge").val();
	}
	kidRefresh();
})

$(".spanCircleKidPurple").click(function () {
	kidArr[kidID].Theme = "purple"
	kidRefresh();
	updateTheme();
})

$(".spanCircleKidGreen").click(function () {
	kidArr[kidID].Theme = "green"
	kidRefresh();
	updateTheme();
})

$(".spanCircleKidBlue").click(function () {
	kidArr[kidID].Theme = "blue"
	kidRefresh();
	updateTheme();
})

$(".spanCircleKidYellow").click(function () {
	kidArr[kidID].Theme = "yellow"
	updateTheme();
	kidRefresh();
})

function updateTheme() {
	var themeClassArr = [$(".green"), $(".blue"), $(".deep-purple"), $(".light-green"), $(".yellow")]
	for (let i = 0; i < themeClassArr.length; i++) {

		if (kidArr[kidID].Theme === "purple") {
			themeClassArr[i].removeClass('green light-green lighten-2 orange yellow blue lighten-1');
			themeClassArr[i].addClass('deep-purple lighten-3');

		} else if (kidArr[kidID].Theme === "green") {
			themeClassArr[i].removeClass('deep-purple lighten-3 orange yellow lighten-1');
			themeClassArr[i].addClass('light-green lighten-2');

		} else if (kidArr[kidID].Theme === "blue") {
			themeClassArr[i].removeClass('green deep-purple lighten-3 light-green lighten-2 yellow lighten-1');
			themeClassArr[i].addClass('blue lighten-2');

		} else if (kidArr[kidID].Theme === "yellow") {
			themeClassArr[i].removeClass('green deep-purple lighten-3 light-green lighten-2 orange');
			themeClassArr[i].addClass('yellow lighten-1');
		}
	}
}


kidRefresh();