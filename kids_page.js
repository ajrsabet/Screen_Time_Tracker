// Load page

$(".spanCircleNameTag").html(kidArr[kidID].name);
$(".kidScreenBal").addClass("kidID" + kidID);
$(".kidMonBal").addClass("kidID" + kidID);
$(".kidPlayPause").addClass("kidID" + kidID);
$(".editBtn").addClass("kidID" + kidID);
$(".monReqstAllBtn").addClass("kidID" + kidID);
$(".ytp-cued-thumbnail-overlay").addClass("kidID" + kidID);
$(".kidLink.kidID" + kidID).parent().remove();


/////////////////// Modal edit form /////////////////
// Change name, age 
$(".kidSaveBtn").click(function () {
	if ($(".kidName").val() !== null) {
		kidArr[kidID].Name = $(".kidName").val();
		console.log($(".kidName").val());
		
	}
	if ($(".kidAge").val() !== null) {
		kidArr[kidID].age = $(".kidAge").val();
		console.log($(".kidAge").val());
	}
	kidRefresh();
})

$(".spanCircleKidPurple").click(function () {
	kidArr[kidID].theme = "purple"
	kidRefresh();
	updateTheme();
})

$(".spanCircleKidGreen").click(function () {
	kidArr[kidID].theme = "green"
	kidRefresh();
	updateTheme();
})

$(".spanCircleKidBlue").click(function () {
	kidArr[kidID].theme = "blue"
	kidRefresh();
	updateTheme();
})

$(".spanCircleKidYellow").click(function () {
	kidArr[kidID].theme = "yellow"
	updateTheme();
	kidRefresh();
})

updateTheme();

//// TODO: API Youtube LH
// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.


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
		
		kidArr[0].imgUrl=this.src
		// $(".body2").css("background-image", "url(" + this.src + ")");
		// $(".box").css("background-image", "url(" + imageUrl + ")");
		console.log($(".body2").css("background-image"));
		
		kidRefresh();
		
	});
});
// populated = true;
// }

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
		if (kidArr[kidID].screenBal >= 0) {
			kidArr[kidID].screenBal = kidArr[kidID].screenBal - 1000;
			// Check if date already exists in history
			if (kidArr[kidID].screenDate.includes(moment().format('MM/DD/YY')) === true) {
				// Get current date index from history
				var indexDate = kidArr[kidID].screenDate.indexOf(moment().format('MM/DD/YY'));

				// Add new value to existing value
				kidArr[kidID].screenHist.splice(indexDate, 1, (JSON.parse(kidArr[kidID].screenHist[indexDate]) + 1000));

			} else {
				// If date is not in history, add new date and value
				kidArr[kidID].screenDate.push(moment().format('MM/DD/YY'));
				kidArr[kidID].screenHist.push(kidArr[kidID].monBal);
				if (!kidArr[kidID].screenHist[indexDate]) {
					// kidArr[kidID].screenHist.push(1);
				}
			}
			kidRefresh();
		} else {
			// Stop timer if time runs out.
			clearInterval(myInterval)
			stopVideo()
			kidArr[kidID].screenBal = 0;
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
$(".monReqstBtn").click(function () {

	if ($(this).prev().val() > kidArr[kidID].monBal) {
		alert("You only have $" + kidArr[kidID].monBal + " You can do more chores to save up.")
	} else {
		kidArr[kidID].monReqst = kidArr[kidID].monReqst + JSON.parse($(this).prev().val())

		kidRefresh();
	}
})

$(".monReqstAllBtn").click(function () {
	alert("You have just requested to be paid!");
	kidArr[kidID].monReqst = kidArr[kidID].monBal

	kidRefresh();

})

kidRefresh();
