// debugger;
/////////////////// Materialize JS /////////////////////////
$(document).ready(function () {
	$(".dropdown-trigger").dropdown();

})

//////////////////// local storage variables//////////////////

let kidID = 0;

let kidArr = [{
	name: "Chris",
	age: "",
	theme: "blue",
	screenBal: 0,
	allowance: .10,
	monBal: 0.00,
	monReqst: 0,
	paidDate: [],
	moneyPaid: [],
	screenDate: [],
	screenHist: [],
	imgUrl: "",
}, {
	name: "Sean",
	age: "",
	theme: "blue",
	screenBal: 0,
	allowance: .10,
	monBal: 0.00,
	monReqst: 0,
	paidDate: [],
	moneyPaid: [],
	screenDate: [],
	screenHist: [],
	imgUrl: "",
}]

// Retrieve local storage
if (localStorage.getItem("kidID") !== null) {
	kidArr = JSON.parse(localStorage.getItem("kidID"));
}

if (localStorage.getItem("kidArr") !== null) {
	kidArr = JSON.parse(localStorage.getItem("kidArr"));
}
console.log("KidID: " + kidID);

// Load links to kid pages in Navbar drop down
for (let i = 0; i < kidArr.length; i++) {
	const kidLi = $("<li>");
	const kidLink = $("<a>");
	$("#dropdown1").append(kidLi);
	kidLi.append(kidLink);
	kidLink.addClass("black-text kidLink kidID" + i);
	kidLink.html(kidArr[i].name);
}

// Set kidID class on objects for function target
$(document).ready(function () {
	let idClassArr = [];
	for (let i = 0; i < kidArr.length; i++) {
		idClassArr.push(".kidID"+i)
		
	}
	idClassString = idClassArr.join();
	console.log(idClassString);
	
	$(idClassString).hover(function () {
		for (let i = 0; i < kidArr.length; i++) {
				if ($(this).hasClass("kidID" + i)) {
				kidID = i;
				localStorage.setItem("kidID", kidID);
				console.log(kidID);
			}
		}
	});
	// $(".kidID1").hover(function () {
	// 	if (kidID !== 1) {
	// 		kidID = 1
	// 		localStorage.setItem("kidID", kidID);
	// 		console.log(kidID);
	// 	}
	// });

	$('.kidLink').click(function () {
		for (let i = 0; i < kidArr.length; i++) {
			if ($(this).hasClass("kidID" + i)) {
				kidID = i;
			}
		}
		console.log("kidID: " + kidID);
		
		localStorage.setItem("kidID", kidID);
		location.href = 'kid1.html';
	})
})



////////////// Refresh local storage/display ////////////


function kidRefresh() {
	// Kid Names	
	$('.spanCircleNameTag.kidID' + kidID).html(kidArr[kidID].name);

	// Allowance rate
	$('.kidAllowance.kidID' + kidID).html("Allowance Rate: $" + kidArr[kidID].allowance * 60 + "/hour");

	// Money balance
	kidArr[kidID].monBal = ((kidArr[kidID].screenBal / 60) * kidArr[kidID].allowance / 1000).toFixed(2);
	$('.kidMonBal.kidID' + kidID).html("Available Money: $" + (kidArr[kidID].monBal));

	// Screen balance
	$('.kidScreenBal.kidID' + kidID).html("Screen Balance: " + (moment(kidArr[kidID].screenBal + (8 * 60 * 60 * 1000)).format('HH:mm:ss')));

	if ((kidArr[kidID].monReqst) > 0) {
		$('.kidMonReqst.kidID' + kidID).html("Allowance Requested: $" + (kidArr[kidID].monReqst).toFixed(2));
	}

	// Display kid name
	$('.kidName.kidID' + kidID).html(kidArr[kidID].name);

	// Local storage Money request total////////////
	localStorage.setItem("kidArr", JSON.stringify(kidArr));
}

function updateTheme() {
	// const themeClassArr = [$(".green"), $(".blue"), $(".deep-purple"), $(".light-green"), $(".yellow")]
	// for (let i = 0; i < themeClassArr.length; i++) {

	if (kidArr[kidID].theme === "purple") {
		$('.kidTheme').removeClass('green light-green lighten-2 orange yellow blue lighten-1');
		$('.kidTheme').addClass('deep-purple lighten-3');

	} else if (kidArr[kidID].theme === "green") {
		$('.kidTheme').removeClass('deep-purple lighten-3 orange yellow lighten-1');
		$('.kidTheme').addClass('light-green lighten-2');

	} else if (kidArr[kidID].theme === "blue") {
		$('.kidTheme').removeClass('green deep-purple lighten-3 light-green lighten-2 yellow lighten-1');
		$('.kidTheme').addClass('blue lighten-2');

	} else if (kidArr[kidID].theme === "yellow") {
		$('.kidTheme').removeClass('green deep-purple lighten-3 light-green lighten-2 orange');
		$('.kidTheme').addClass('yellow lighten-1');
	} else {
		$('.kidTheme').addClass('green');
	}
	// }
}





/////////////////// Stats/parents portal ////////////////

// TODO: PARKING LOT pay kid custom amount WORKING JUST UN_COMMENT AND ADD BUTTON. 
// TODO: Update variables, split moneyHist into 2 arrays
// $(".payKid1Btn").on("click", function () {

// 	// Check balance available
// 	if (JSON.parse($(this).prev().val()) >= kidArr[kidID].monBal) {
// 		alert("Balance available: $" + kidArr[kidID].monBal + ". Please choose another amount")

// 	} else {
// 		// Check if date already exists in history
// 		if (kidArr[kidID].moneyPaid.includes(moment().format('MM/DD/YY')) === true) {
// 			// Get current date index from history
// 			var indexDate = kidArr[kidID].moneyPaid.indexOf(moment().format('MM/DD/YY'));

// 			// Add new value to existing value
// 			kidArr[kidID].moneyPaid.splice(indexDate + 1, 1, JSON.stringify(parseInt(kidArr[kidID].moneyPaid[indexDate + 1]) + JSON.parse($(this).prev().val())));

// 			// Reduce available balance
// 			kidArr[kidID].screenBal = (kidArr[kidID].screenBal - (JSON.parse($(this).prev().val())) / kidArr[kidID].allowance)

// 		} else {
// 			// If date is not in history, add new date and value
// 			kidArr[kidID].moneyPaid.push(moment().format('MM/DD/YY'));
// 			kidArr[kidID].moneyPaid.push($(this).prev().val());

// 			// Reduce available balance
// 			kidArr[kidID].screenBal = (kidArr[kidID].screenBal - (JSON.parse($(this).prev().val())) / kidArr[kidID].allowance)

// 		}

// 		// Update kidArr[kidID].screenBal
// 		if (JSON.parse($(this).prev().val()) >= kidArr[kidID].monReqst) {

// 			kidArr[kidID].monReqst = 0;
// 		} else {
// 			kidArr[kidID].monReqst = kidArr[kidID].monReqst - JSON.parse($(this).prev().val());
// 			kidArr[kidID].screenBal = kidArr[kidID].screenBal - (JSON.parse($(this).prev().val()) / kidArr[kidID].allowance);
// 		}
// 		kidRefresh();
// 	}
// });

// pay kid all requested 
$(".payKidAllBtn").on("click", function () {

	// Check if date already exists in history
	if (kidArr[kidID].paidDate.includes(moment().format('MM/DD/YY')) === true) {
		// Get current date index from history
		var indexDate = kidArr[kidID].paidDate.indexOf(moment().format('MM/DD/YY'));

		// Add new value to existing value
		kidArr[kidID].moneyPaid.splice(indexDate, 1, (JSON.parse(kidArr[kidID].moneyPaid[indexDate]) + JSON.parse(kidArr[kidID].monBal)));

	} else {
		// If date is not in history, add new date and value
		kidArr[kidID].paidDate.push(moment().format('MM/DD/YY'));
		kidArr[kidID].moneyPaid.push(kidArr[kidID].monBal);

	}

	// Update kidArr[kidID].screenBal
	kidArr[kidID].monReqst = 0;
	kidArr[kidID].screenBal = 0;
	kidRefresh();
});

// Add time/money
$(".kidAddTimeBtn").click(function () {
	console.log("add: " + kidID);

	kidArr[kidID].screenBal = kidArr[kidID].screenBal + (15 * 60 * 1000);

	kidRefresh();
})

// Deduct time/money
$(".kidDeductTimeBtn").click(function () {
	console.log("deduct: " + kidID);

	if (kidArr[kidID].screenBal >= 15) {

		kidArr[kidID].screenBal = kidArr[kidID].screenBal - (15 * 60 * 1000);

		kidRefresh();

	} else {
		kidArr[kidID].screenBal = 0;
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

			kidArr[kidID].imgUrl = $(this.src)
			kidRefresh();

		});
	});
	// populated = true;
	// }
});

kidRefresh();