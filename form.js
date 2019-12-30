// Load current kid onto form

if (kidID === kidArr.length) {
    $('#edit-profile').text('Add New Kid')
} else {
    $('#edit-profile').text('Edit ' + kidArr[kidID].name + "'s Profile")
    $('.kidTheme').addClass('kidID'+kidID);
    $('.kidName').val(kidArr[kidID].name)
    updateTheme();
}


// Change name, age 
$('.kidSaveBtn').click(function () {
	if ($('.kidName').val() !== null) {
		kidArr[kidID].Name = $('.kidName').val();
		console.log($('.kidName').val());
		
	}
	if ($('.kidAge').val() !== null) {
		kidArr[kidID].age = $('.kidAge').val();
		console.log($('.kidAge').val());
	}
	kidRefresh();
})

$('.spanCircleKidPurple').click(function () {
	kidArr[kidID].theme = 'purple'
	kidRefresh();
	updateTheme();
})

$('.spanCircleKidGreen').click(function () {
	kidArr[kidID].theme = 'green'
	kidRefresh();
	updateTheme();
})

$('.spanCircleKidBlue').click(function () {
	kidArr[kidID].theme = 'blue'
	kidRefresh();
	updateTheme();
})

$('.spanCircleKidYellow').click(function () {
	kidArr[kidID].theme = 'yellow'
	updateTheme();
	kidRefresh();
})

