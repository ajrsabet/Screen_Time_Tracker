// debugger;
/////////////////// Materialize JS /////////////////////////
$(document).ready(function () {
	$('.dropdown-trigger').dropdown();

})

//////////////////// local storage variables//////////////////

let kidID;

let kidArr = [{
	name: 'Chris',
	age: '',
	theme: 'yellow',
	screenBal: 0,
	allowance: .10,
	monBal: 0.00,
	monReqst: 0,
	paidDate: [],
	moneyPaid: [],
	screenDate: [],
	screenHist: [],
	imgUrl: '',
}, {
	name: 'Sean',
	age: '',
	theme: 'purple',
	screenBal: 0,
	allowance: .10,
	monBal: 0.00,
	monReqst: 0,
	paidDate: [],
	moneyPaid: [],
	screenDate: [],
	screenHist: [],
	imgUrl: '',
}, {
	name: 'Amy',
	age: '',
	theme: 'blue',
	screenBal: 0,
	allowance: .10,
	monBal: 0.00,
	monReqst: 0,
	paidDate: [],
	moneyPaid: [],
	screenDate: [],
	screenHist: [],
	imgUrl: '',
// }, {
// 	name: 'Amy',
// 	age: '',
// 	theme: 'blue',
// 	screenBal: 0,
// 	allowance: .10,
// 	monBal: 0.00,
// 	monReqst: 0,
// 	paidDate: [],
// 	moneyPaid: [],
// 	screenDate: [],
// 	screenHist: [],
// 	imgUrl: '',
// }, {
// 	name: 'Amy',
// 	age: '',
// 	theme: 'blue',
// 	screenBal: 0,
// 	allowance: .10,
// 	monBal: 0.00,
// 	monReqst: 0,
// 	paidDate: [],
// 	moneyPaid: [],
// 	screenDate: [],
// 	screenHist: [],
// 	imgUrl: '',
// }, {
// 	name: 'Amy',
// 	age: '',
// 	theme: 'blue',
// 	screenBal: 0,
// 	allowance: .10,
// 	monBal: 0.00,
// 	monReqst: 0,
// 	paidDate: [],
// 	moneyPaid: [],
// 	screenDate: [],
// 	screenHist: [],
// 	imgUrl: '',
}]

// Retrieve local storage
if (localStorage.getItem('kidID') !== null) {
	kidID = JSON.parse(localStorage.getItem('kidID'));
	console.log('KidID: ' + kidID);
}

if (localStorage.getItem('kidArr') !== null) {
	kidArr = JSON.parse(localStorage.getItem('kidArr'));
}
console.log('KidID: ' + kidID);

// Load links to kid pages in Navbar drop down
for (let i = 0; i < kidArr.length; i++) {
	const kidLi = $('<li>');
	const kidLink = $('<a>');
	$('#dropdown1').append(kidLi);
	kidLi.append(kidLink);
	kidLink.addClass('black-text kidLink kidID' + i);
	kidLink.attr('href', 'kid.html');
	kidLink.html(kidArr[i].name);
}

// Set kidID class on objects for function target
$(document).ready(function () {
	let idClassArr = [];
	for (let i = 0; i < kidArr.length; i++) {
		idClassArr.push('.kidID'+i)
		
	}
	idClassString = idClassArr.join();
	console.log(idClassString);
	
	$(idClassString).hover(function () {
		for (let i = 0; i < kidArr.length; i++) {
				if ($(this).hasClass('kidID' + i)) {
				kidID = i;
				localStorage.setItem('kidID', kidID);
				console.log(kidID);
			}
		}
	});
})



////////////// Refresh local storage/display ////////////


function kidRefresh() {
	// Kid Names	
	$('.spanCircleNameTag.kidID' + kidID).html(kidArr[kidID].name);

	// Allowance rate
	$('.kidAllowance.kidID' + kidID).html('Allowance Rate: $' + kidArr[kidID].allowance * 60 + '/hour');

	// Money balance
	kidArr[kidID].monBal = ((kidArr[kidID].screenBal / 60) * kidArr[kidID].allowance / 1000).toFixed(2);
	$('.kidMonBal.kidID' + kidID).html('Available Money: $' + (kidArr[kidID].monBal));

	// Screen balance
	$('.kidScreenBal.kidID' + kidID).html('Screen Balance: ' + (moment(kidArr[kidID].screenBal + (8 * 60 * 60 * 1000)).format('HH:mm:ss')));

	if ((kidArr[kidID].monReqst) > 0) {
		$('.kidMonReqst.kidID' + kidID).html('Allowance Requested: $' + (kidArr[kidID].monReqst).toFixed(2));
	}

	// Display kid name
	$('.kidName.kidID' + kidID).html(kidArr[kidID].name);

	// Local storage Money request total////////////
	localStorage.setItem('kidArr', JSON.stringify(kidArr));
}

// Update all accent colors for each kid
function updateTheme() {
		if (kidArr[kidID].theme === 'purple') {
		$('.kidTheme.kidID'+kidID).removeClass('green light-green lighten-2 orange yellow blue lighten-1');
		$('.kidTheme.kidID'+kidID).addClass('deep-purple lighten-3');

	} else if (kidArr[kidID].theme === 'green') {
		$('.kidTheme.kidID'+kidID).removeClass('deep-purple lighten-3 orange yellow lighten-1');
		$('.kidTheme.kidID'+kidID).addClass('light-green lighten-2');

	} else if (kidArr[kidID].theme === 'blue') {
		$('.kidTheme.kidID'+kidID).removeClass('green deep-purple lighten-3 light-green lighten-2 yellow lighten-1');
		$('.kidTheme.kidID'+kidID).addClass('blue lighten-2');

	} else if (kidArr[kidID].theme === 'yellow') {
		$('.kidTheme.kidID'+kidID).removeClass('green deep-purple lighten-3 light-green lighten-2 orange');
		$('.kidTheme.kidID'+kidID).addClass('yellow lighten-1');
	} else {
		$('.kidTheme.kidID'+kidID).addClass('green');
	}
}

kidRefresh();