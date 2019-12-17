/////////////////// Materialize JS /////////////////////////
$(document).ready(function () {
	$(".dropdown-trigger").dropdown();
	player.stopVideo();
})



/////////////////// Home page /////////////////////////
// TODO: MDP Add kid 
// TODO: Go to parent portal stats.html
// TODO: Go to kids page kid.html
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


if (localStorage.getItem("kidArr") !== null) {
	kidArr = JSON.parse(localStorage.getItem("kidArr"));
}

var ThemeArr = ["pink", "blue", "orange", "black"]
////////////////// Retrieve local storage /////////////
// if (localStorage.getItem("kidArr[0].ScreenBal") !== null) {
// 	kidArr[0].ScreenBal = JSON.parse(localStorage.getItem("kidArr[0].ScreenBal"));
// }


////////////// Refresh local storage/display ////////////
function kid1Refresh() {
	// Allowence rate
	$('.kid1Allowence').html("Allowence Rate: $" + kidArr[0].Allowence * 60 + "/hour");

	// Money balance
	kidArr[0].MonBal = ((kidArr[0].ScreenBal / 60) * kidArr[0].Allowence / 1000).toFixed(2);
	$('.kid1MonBal').html("Available Money: $" + (kidArr[0].MonBal));

	// Screen balance
	$('.kid1ScreenBal').html("Screen Balance: " + (moment(kidArr[0].ScreenBal + (8 * 60 * 60 * 1000)).format('HH:mm:ss')));


	$('.kid1MonReqst').html("Money request $" + kidArr[0].MonReqst);

	$('.kid1Name').html(kidArr[0].Name);

	// Local storage Money request total////////////
	localStorage.setItem("kidArr", JSON.stringify(kidArr));
}


/////////////////// Stats/parents portal ////////////////

// TODO: View graph/history 

var ctx = document.getElementById('myChart');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
		// insert dates/time for info to be displayed
        labels: ['12/1', '12/8', '12/15', '12/22', '12/29'],
        datasets: [{
			label: 'Time/Money Consumed over Time',
			// insert data values for appropriate dates/times 
            data: [kid1MoneyHist, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
			borderWidth: 1,
			maintainAspectRatio: true,
			
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
var ctx = document.getElementById('myChart2');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['12/1', '12/8', '12/15', '12/22', '12/29'],
        datasets: [{
            label: '# of Votes',
            data: [kid1MoneyHist, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
			borderWidth: 1,
			maintainAspectRatio: true,
			
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});


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
	if (JSON.parse($(this).prev().val()) >= kidArr[0].MonBal) {
		alert("Balance available: $" + kidArr[0].MonBal + ". Please choose another amount")

	} else {
		// Check if date already exists in history
		if (kidArr[0].MoneyHist.includes(moment().format('YYYYMMDD')) === true) {
			// Get current date index from history
			var indexDate = kidArr[0].MoneyHist.indexOf(moment().format('YYYYMMDD'));

			// Add new value to existing value
			kidArr[0].MoneyHist.splice(indexDate + 1, 1, JSON.stringify(parseInt(kidArr[0].MoneyHist[indexDate + 1]) + JSON.parse($(this).prev().val())));

			// Reduce available balance
			kidArr[0].ScreenBal = (kidArr[0].ScreenBal - (JSON.parse($(this).prev().val())) / kidArr[0].Allowence)

		} else {
			// If date is not in history, add new date and value
			kidArr[0].MoneyHist.push(moment().format('YYYYMMDD'));
			kidArr[0].MoneyHist.push($(this).prev().val());

			// Reduce available balance
			kidArr[0].ScreenBal = (kidArr[0].ScreenBal - (JSON.parse($(this).prev().val())) / kidArr[0].Allowence)

		}

		// Update kidArr[0].ScreenBal
		if (JSON.parse($(this).prev().val()) >= kidArr[0].MonReqst) {

			kidArr[0].MonReqst = 0;
		} else {
			kidArr[0].MonReqst = kidArr[0].MonReqst - JSON.parse($(this).prev().val());
			kidArr[0].ScreenBal = kidArr[0].ScreenBal - (JSON.parse($(this).prev().val()) / kidArr[0].Allowence);
		}
		kid1Refresh();
	}
});

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
// TODO: Edit/customize styles LH


// insert class for saveBtn
var saveBtn = $(".saveBtn");
// insert value for name text box
// var name = $("");
// insert value for age text box
// var age = $("");
// insert value for background input

// var populated = false;

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


// saveBtn.on("click", function () {

// 	// localStorage.setItem("kid2ImgURL", (kid2ImgURL))

// });


///// TODO: modal popout 

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
		autoplay: 1,
		events: {
			'onReady': onPlayerReady,
			//'onStateChange': onPlayerStateChange
		}
	});
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
	player.stopVideo();
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

////// TODO: MDP dynamic search 


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
// TODO: Change name, age 
//// TODO: Local storage AJS
$(".kid1SaveBtn").click(function () {
	if ($(".kid1Name").val !== null) {
		kidArr[0].Name = $(".kid1Name").val();
	}
	if ($(".kid1Age").val !== null) {
		kidArr[0].Age = $(".kid1Age").val();
	}
	// if ($(".kid1Theme").val !== null) {
	// 	kidArr[0].Theme = $(".kid1Theme").val();
	// }
	kid1Refresh();
})

$(".spanCircleKidPurple").click(function () {
	kidArr[0].Theme = "purple"
	kid1Refresh();
	updateTheme();
	console.log(kidArr[0].Theme);

})

$(".spanCircleKidGreen").click(function () {
	kidArr[0].Theme = "green"
	kid1Refresh();
	updateTheme();
	console.log(kidArr[0].Theme);
})

$(".spanCircleKidBlue").click(function () {
	kidArr[0].Theme = "blue"
	kid1Refresh();
	updateTheme();
	console.log(kidArr[0].Theme);
})

$(".spanCircleKidYellow").click(function () {
	kidArr[0].Theme = "yellow"
	updateTheme();
	kid1Refresh();
	console.log(kidArr[0].Theme);
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

//   function updateTheme() {
// 	var green = document.getElementsByClassName('green');
// 	for(i = 0; i < green.length; i++) {
// 	  'blue';
// 	  if (kidArr[0].Theme === "pink") {
// 		  console.log("pink");

// 		green[i].style.backgroundColor =  "#e91e63"
// 	} else if (kidArr[0].Theme === "blue"){ 
// 		console.log("blue");
// 		green[i].style.backgroundColor =  "#2196F3"
// 	} else if (kidArr[0].Theme === "orange"){
// 		console.log("orange");
// 		green[i].style.backgroundColor =  "#ff9800"
// 	} else if (kidArr[0].Theme === "black"){
// 		console.log("black");
// 		green[i].style.backgroundColor =  "#000000"
// 	}
// 	}
//   }

//// TODO: Display

// TODO: Change theme style LH
//// TODO: Trigger: button click 
//// TODO: Store preference
// MOVED TO TOP//// var kid1Theme;
// var kid2Theme; 

//// TODO: Append class to divs


// TODO: Change background LH
//// TODO: API unsplash

kid1Refresh();



///////////////////////////////////////////////////////////////////////
////////////////////                    ///////////////////////////////
////////////////////       KID 2        ///////////////////////////////
////////////////////                    ///////////////////////////////
///////////////////////////////////////////////////////////////////////

////////////// Refresh local storage/display ////////////
function kid2RefreshBalances() {
	// Allowence rate
	$('.kid2Allowence').html("Allowence Rate: $" + kidArr[1].Allowence * 60 + "/hour");

	// Money balance
	kidArr[1].MonBal = ((kidArr[1].ScreenBal / 60) * kidArr[1].Allowence / 1000).toFixed(2);
	$('.kid2MonBal').html("Available Money: $" + (kidArr[1].MonBal));

	// Screen balance
	$('.kid2ScreenBal').html("Screen Balance: " + (moment(kidArr[1].ScreenBal + (8 * 60 * 60 * 1000)).format('HH:mm:ss')));


	$('.kid2MonReqst').html("Money request $" + kidArr[1].MonReqst);

	// Local storage Money request total////////////
	localStorage.setItem("kidArr", JSON.stringify(kidArr));
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
$(".payKid2Btn").on("click", function () {

	// Check balance available
	if (JSON.parse($(this).prev().val()) >= kidArr[1].MonBal) {
		alert("Balance available: $" + kidArr[1].MonBal + ". Please choose another amount")

	} else {
		// Check if date already exists in history
		if (kidArr[1].MoneyHist.includes(moment().format('YYYYMMDD')) === true) {
			// Get current date index from history
			var indexDate = kidArr[1].MoneyHist.indexOf(moment().format('YYYYMMDD'));

			// Add new value to existing value
			kidArr[1].MoneyHist.splice(indexDate + 1, 1, JSON.stringify(parseInt(kidArr[1].MoneyHist[indexDate + 1]) + JSON.parse($(this).prev().val())));

			// Reduce available balance
			kidArr[1].ScreenBal = (kidArr[1].ScreenBal - (JSON.parse($(this).prev().val())) / kidArr[1].Allowence)

		} else {
			// If date is not in history, add new date and value
			kidArr[1].MoneyHist.push(moment().format('YYYYMMDD'));
			kidArr[1].MoneyHist.push($(this).prev().val());

			// Reduce available balance
			kidArr[1].ScreenBal = (kidArr[1].ScreenBal - (JSON.parse($(this).prev().val())) / kidArr[1].Allowence)

		}

		// Update kidArr[1].ScreenBal
		if (JSON.parse($(this).prev().val()) >= kidArr[1].MonReqst) {

			kidArr[1].MonReqst = 0;
		} else {
			kidArr[1].MonReqst = kidArr[1].MonReqst - JSON.parse($(this).prev().val());
			kidArr[1].ScreenBal = kidArr[1].ScreenBal - (JSON.parse($(this).prev().val()) / kidArr[1].Allowence);
		}
		kid2RefreshBalances();
	}
});

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
	kid2RefreshBalances();
});


// Add time/money
$(".kid2AddTimeBtn").click(function () {

	kidArr[1].ScreenBal = kidArr[1].ScreenBal + (15 * 60 * 1000);
	kid2RefreshBalances();
})

// Deduct time/money
$(".kid2DeductTimeBtn").click(function () {

	if (kidArr[1].ScreenBal >= 15) {

		kidArr[1].ScreenBal = kidArr[1].ScreenBal - (15 * 60 * 1000);
		kid2RefreshBalances();
	} else {
		kidArr[1].ScreenBal = 0;
		alert("There is less than 15 minutes remaining. The balance is set to 0")
	}
})




/////////////////// Kids page /////////////////
// TODO: Edit/customize styles LH


// // insert class for saveBtn
// var saveBtn = $(".saveBtn");
// // insert value for name text box
// // var name = $("");
// // insert value for age text box
// // var age = $("");
// // insert value for background input

// var searchInput = "dogs";
// var queryURL = "https://api.unsplash.com/search/photos?query=" + searchInput + "&client_id=e95ecaea5f2f22854ddc21c0f047145e88a13a1759d8a88737ec5affafc9ead4";

// $(document).ready(function () {
// 	$.ajax({
// 		allRoutes: true,
// 		url: queryURL,
// 		method: "GET"
// 	}).then(function (response) {
// 		console.log(response.results[0].urls.thumb);
// 		var imageHolder = $(".kid-background-image");
// 		// var searchImage = $("<img>");

// 		imageHolder.attr("src", (response.results[0].urls.thumb));
// 		// imageHolder.append(imageHolder);

// 	});
// });

// saveBtn.on("click", function () {
// 	localStorage.setItem("kid2ImgURL", (kidArr[1].ImgURL))

// 	// localStorage.setItem("kid2ImgURL", (kid2ImgURL))

// });


///// TODO: modal popout 

//  Start/stop time AJS
// Play/pause button
var kid2play = false;
$(".kid2PlayPause").on("click", function () {

	if (kid2play === true) {
		kid2play = false;
		kid2stopTimer();
	} else {
		kid2play = true;
		kid2startTimer();
	}
});

// Timer start
function kid2startTimer() {
	myInterval = setInterval(function () {
		if (kidArr[1].ScreenBal >= 0) {
			kidArr[1].ScreenBal = kidArr[1].ScreenBal - 1000;

			kid2RefreshBalances();
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


//// TODO: API Youtube LH
// 2. This code loads the IFrame Player API code asynchronously.
// var tag = document.createElement('script');

// tag.src = "https://www.youtube.com/iframe_api";
// var firstScriptTag = document.getElementsByTagName('script')[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// // 3. This function creates an <iframe> (and YouTube player)
// //    after the API code downloads.
// var player;

// function onYouTubeIframeAPIReady() {
// 	player = new YT.Player('player', {
// 		height: '390',
// 		width: '640',
// 		videoId: '_UVhAWP83TM',
// 		events: {
// 			'onReady': onPlayerReady,
// 			'onStateChange': onPlayerStateChange
// 		}
// 	});
// }

// 4. The API will call this function when the video player is ready.
// function onPlayerReady(event) {
// 	event.target.playVideo();
// }

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
// var done = false;

// function onPlayerStateChange(event) {
// 	if (event.data == YT.PlayerState.PLAYING && !done) {
// 		// setTimeout(stopVideo, 6000);
// 		done = true;
// 	}
// }

// function stopVideo() {
// 	player.stopVideo();
// }
////// TODO: MVP static video URL request
////// TODO: MDP dynamic search 


// Money request 
$(".kid2MonReqstBtn").click(function () {

	if ($(this).prev().val() > kidArr[1].MonBal) {
		alert("You only have $" + kidArr[1].MonBal + " You can do more chores to save up.")
	} else {
		kidArr[1].MonReqst = kidArr[1].MonReqst + JSON.parse($(this).prev().val())

		kid2RefreshBalances();
	}
})

$(".kid2MonReqstAllBtn").click(function () {
	alert("You have just requested to be paid!");
	kidArr[1].MonReqst = kidArr[1].MonBal

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