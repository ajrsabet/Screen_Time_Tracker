console.log("Hello World!")

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
//// TODO: moment.js
////// TODO: Create local storage of day usage history AJS
var kid1MoneyHist = ["12-13-19: 15",35,180,];
var kid2MoneyHist = [15,35,180,];
var kid1ScreenHist = [15,35,180,];
var kid2ScreenHist = [15,35,180,];
// TODO: Add time/money AJS
//// TODO: update Local storage

// TODO: Payout request confirmation
//// TODO: Update local storage (balance decrease, request = 0)




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

// TODO: Start/stop time AJS
//// TODO: Update local storage (per minute)


//// TODO: API Youtube LH
////// TODO: MVP static video URL request
////// TODO: MDP dynamic search 

// TODO: Request money AJS
//// TODO: Update local storage
var kid1MoneyRequest;
var kid2MoneyRequest;

/////////////////// Modal edit form /////////////////
// TODO: Change name, age 
//// TODO: Local storage AJS
var kid1Info = ("name", "age")
var kid2Info = ("name", "age") 
//// TODO: Display

// TODO: Change theme style LH
//// TODO: Trigger: button click 
//// TODO: Store preference
var kid1Theme;
var kid2Theme; 

//// TODO: Append class to divs


// TODO: Change background LH
//// TODO: API unsplash