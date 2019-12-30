for (let i = 0; i < kidArr.length; i++) {
    kidID = i;
// append stick figure
    $('.genKids').append($('<div>').addClass('kidCol kid' + i));
    $('.kidCol.kid' + i).append($('<img>').addClass('figureSize1 kid' + i))
    $('.figureSize1.kid' + i).attr('src', 'images/stick dad.png')
    $('.figureSize1.kid' + i).attr('alt', 'stick3')

// append name circle
    $('.kidCol.kid' + i).append($('<div>').addClass('col hvr-bob kid' + i));
    $('.hvr-bob.kid' + i).append($('<a>').addClass('kidLink kid' + i));
    $('.kidLink.kid' + i).attr('href', 'kid.html');
    $('.kidLink.kid' + i).append($('<span>').addClass('kidTheme spanCircleNameTag kidID' + i));

    kidRefresh();
    updateTheme();
}