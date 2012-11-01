var socket = io.connect(window.location.hostname);

socket.on('status', function (data) {
    $('#status').html(data.status);
});

$('#reset').click(function() {
    socket.emit('reset');
});

/*
var	buttons =	['#index-link', '#create-link', '#join-link', '#input-link', '#display-link'],
	links =		['/', '/create', '/join', '/input', '/display'];
	
for(var i = 0; i < buttons.length; i++) {
	$(buttons[i]).click(function () {
		$.get( links[i], function( data ) {
			$('body').html(data);
			$('body').trigger('create');
		});
	});
}
*/
	
/*
$("#index-link").click(function () {
	$.get( '/index', function( data ) {
	  $( 'body' ).html( data );
	  $.mobile.pageContainer.append($('body'));
	  $('body').trigger('create');
	});
});
*/
/*

$(document).bind("mobileinit", function(){
	$.mobile.defaultPageTransition.content('slidefade');
});
*/

/*
$("#index-link").click(function () {
	$.mobile.changePage('/');
});

$("#create-link").click(function () {
	$.mobile.changePage('/create');
});


$("#join-link").click(function () {
	$.mobile.changePage('/join');
});


/*
$("#join-link").click(function () {
	$('body').load('/join');
});
*/
	
$("#input-link").click(function () {
	$.mobile.changePage('/input');
});

$("#display-link").click(function () {
	$.mobile.changePage('/display');
});
    
    
*/
