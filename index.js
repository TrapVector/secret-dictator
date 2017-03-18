var express = require( 'express' );
var app     = express();
var http    = require( 'http' ).Server( app );
var io      = require( 'socket.io' )( http );

var games = [];

app.set( 'port', ( process.env.PORT || 5000 ) );

app.use( express.static( __dirname + '/public' ) );

app.get( '/', function( request, response ) {
	response.sendFile( __dirname + '/index.html' );
});

app.get( '/game/:gameId', function( request, response ) {
	var gameId = request.params.gameId;
	var game = null;
	
	for( i = 0; i < games.length; i++ )
	{
		if( games[ i ].id === gameId )
		{
			game = games[ i ];
			break;
		}
	}
			
	if( game === null )
	{
		games.push( { id: gameId } );
		response.sendFile( __dirname + '/game_host.html' );
	}
	else
	{
		response.sendFile( __dirname + '/game_player.html' );
	}
	
	io.on( 'connection', function( socket ) {
		console.log( 'a user connected' );
		io.emit( 'game-joined', '' );
	
		//socket.on( 'chat message', function( message ) {
		//	console.log( 'message: ' + message );
		//	io.emit( 'chat message', message );
		//} );
		socket.on( 'name-set', function( name ) {
		
		} );
		
		socket.on( 'disconnect', function() {
			console.log( 'user disconnected' );
		} );
	} );
} );

http.listen( app.get( 'port' ), function() {
	console.log( 'Node app is running on port', app.get( 'port' ) );
});
