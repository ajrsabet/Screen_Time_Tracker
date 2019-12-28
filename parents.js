for (let i = 0; i < kidArr.length; i++) {
    kidID = i;

    ////// append name circle //////
    $(".genKids").append($("<div>").addClass("kidCol kid" + i));
    $(".kidCol.kid" + i).append($("<a>").addClass("kidLink kid" + i));
    $(".kidLink.kid" + i).attr("href", "kid.html");
    $(".kidLink.kid" + i).append($("<span>").addClass("kidTheme spanCircleNameTag kidID" + i));

    ////// append kid time buttons //////
    $(".kidCol.kid" + i).append($("<div>").addClass("row addSubTime kid" + i));
    
    // add time button
    $(".addSubTime.kid" + i).append($("<div>").addClass("col s2 moveOver addTime kid" + i));
    $(".addTime.kid" + i).append($("<a>").addClass("kidAddTimeBtn kid" + i));
    $(".kidAddTimeBtn.kid" + i).append($("<i>").addClass("small material-icons hvr-bob addTime kidID" + i));
    $(".material-icons.addTime.kidID" + i).text("add_circle_icon");
    // subtract time button
    $(".addSubTime.kid" + i).append($("<div>").addClass("col s2 moveOver subTime kid" + i));
    $(".subTime.kid" + i).append($("<a>").addClass("kidDeductTimeBtn kid" + i));
    $(".kidDeductTimeBtn.kid" + i).append($("<i>").addClass("small material-icons hvr-bob subTime kidID" + i));
    $(".material-icons.subTime.kidID" + i).text("remove_circle_icon");

    ////// Display time balance //////
    $(".kidCol.kid" + i).append($("<span>").addClass("black-text kidTheme spanOvalBar kidScreenBal kidID" + i));
    // $(".kidScreenBal.kid"+i).text("Screen Balance: 00:00:00")
    $(".kidCol.kid" + i).append($("<span>").addClass("black-text kidTheme spanOvalBar kidMonBal kidID" + i));
    // $(".kidScreenBal.kid"+i).text("Available Money: $0.00")
    $(".kidCol.kid" + i).append($("<span>").addClass("black-text kidTheme spanOvalBar payKidAllBtn kidID" + i));
    $(".payKidAllBtn.kidID"+i).text("Pay Allowence")

    kidRefresh();
    updateTheme();
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


//////////////////// charts ////////////////////////
var ctx = document.getElementById('myChart');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['12/12', '12/13', '12/14', '12/15', '12/16', '12/17', '12/18', ],
        datasets: [{
                label: kidArr[0].name,
                data: [19, 3, 5, 2, 3, 3, 5, ],
                // data: [kidArr[0].MoneyHist],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                maintainAspectRatio: true,

            },
            {
                label: 'Allowence Paid',
                data: [19, 3, 5, 2, 3, 3, 5, ],
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
                maintainAspectRatio: true,

            }
        ]
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
        labels: ['12/12', '12/13', '12/14', '12/15', '12/16', '12/17', '12/18', ],
        datasets: [{
                label: 'Allowence Paid',
                data: [19, 3, 5, 2, 3, 3, 5, ],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                maintainAspectRatio: true,

            },
            {
                label: 'Allowence Paid',
                data: [19, 3, 5, 2, 3, 3, 5, ],
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
                maintainAspectRatio: true,

            }
        ]
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

kidRefresh();