$(function () {
	//var socket = io();
	//$('form').submit(function(){
	//	socket.emit('chat message', $('#m').val());
	//	$('#m').val('');
	//	return false;
	//});
	//socket.on('chat message', function(msg){
	//	$('#messages').append($('<li>').text(msg));
    //});
	
	var socket = io();
	socket.on( 'game-joined', function() {
		$( '#data' ).text( 'Game joined.' );
	} );
	
	$( 'form' ).submit( function() {
		socket.emit( 'set-name', $( '#name' ).val() );
		$( '#name-form' ).hide();
		return false;
	} );
} );