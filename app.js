var express = require('express'),
    app = express.createServer(express.logger()),
    io = require('socket.io').listen(app),
    routes = require('./routes'),
    pg = require('pg');
    
var Pusher = require('node-pusher');

// Configuration

var pusher = new Pusher({
  appId: '31276',
  key: '1c0d1fc18d1af207286e',
  secret: '0ef113093fd30fd6519d'
});

app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function() {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function() {
  app.use(express.errorHandler());
});

/*
pg.connect(process.env.DATABASE_URL, function(err, client) {
  var query = client.query('SELECT * FROM events WHERE ');

  query.on('row', function(row) {
    console.log(JSON.stringify(row));
  });
});
*/

// Heroku won't actually allow us to use WebSockets
// so we have to setup polling instead.
// https://devcenter.heroku.com/articles/using-socket-io-with-node-js-on-heroku


io.configure(function () {
  io.set("transports", ["xhr-polling"]);
  io.set("polling duration", 10);
  io.set("close timeout", 11);
  io.set("log level", 0);
});



// Routes

var port = process.env.PORT || 5000; // Use the port that Heroku provides or default to 5000
app.listen(port, function() {
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

var currentUserID = 0;

app.get('/', routes.index);
app.get('/join', routes.join);
app.get('/create', routes.create);
app.get('/input/:name', routes.input);
app.get('/display/:name', routes.display);
app.post('/pusher/auth', function(req, res){
	console.log('socket_id: ' + req.body.socket_id + ' channel_name: ' + req.body.channel_name );
	res.send(pusher.auth( req.body.socket_id, req.body.channel_name, { user_id : currentUserID } ));
	currentUserID++;
});

/* var clients = []; */
var visualizerClients = [];

io.sockets.on('connection', function (socket) {
	var address = socket.handshake.address;
	console.log("New connection from " + address.address + ":" + address.port);
	
	socket.on('recentSearch', function() {
		var recentVisualizers = [];
		for( var i = 0; i < visualizerClients.length; i++ ) {
			var visualizer = visualizerClients[i];
			console.log('Request address: ' + address.address);
			console.log('Stored adddress: ' + visualizer.address);
			if ( visualizer.address == address.address ) {
				recentVisualizers.push( { name: visualizer.name } );
			}
		}
		socket.emit('recentFound', { visualizers : recentVisualizers });
	});

	socket.on('visualizerRequest', function(data) {
		for(var i = 0; i < visualizerClients.length; i++) {
			if(visualizerClients[i].name == data.name) {
				socket.emit('nameAlreadyTaken');
				return;
			}
		}
		console.log('+++++Visualizer created with id: ' + socket.id + ', name: ' + data.name + ', at longitude: ' + data.longitude + ', latitude: ' + data.latitude);
		visualizerClients.push( { address : address.address, id: socket.id, name: data.name, type: data.type, longitude: data.longitude, latitude: data.latitude } );
		socket.emit('nameAccepted');
	});
	
	socket.on('visualizerSearch', function(data) {
		var visualizersFound = [];
		for( var i = 0; i < visualizerClients.length; i++ ) {
			var visualizer = visualizerClients[i];
			var lon1 = visualizer.longitude,
				lat1 = visualizer.latitude,
				lon2 = data.longitude,
				lat2 = data.latitude;
				
			if ( withinProximity( lon1, lat1, lon2, lat2 ) ) {
				console.log('Visualizer found! Name: ' + visualizer.name);
				visualizersFound.push( { name: visualizer.name } );
			}
		}
		socket.emit( 'visualizersFound', { visualizers: visualizersFound } );
	});
	socket.on('requestType', function(data) {
		var visualizersFound = [];
		for( var i = 0; i < visualizerClients.length; i++ ) {
			console.log('Type is: ' + visualizerClients[i].type);
			if ( visualizerClients[i].name == data.name ) {
				console.log('Found type, type is: ' + visualizerClients[i].type);
				socket.emit('typeIs', { type : visualizerClients[i].type } );
				return;
			}
		}
		console.log('Did not find type');
	});
	
/*
	socket.on('disconnect', function () {
		console.log('-----Client disconnected.-----');
		console.log(socket.id);
		for( var i=0, len = visualizerClients.length; i<len; i++ ){
			if(visualizerClients[i].id == socket.id){
				visualizerClients.splice(i,1);
				break;
			}
		}
	});
*/
});

var maxDistance = 10; // in km

function withinProximity( lon1, lat1, lon2, lat2 ) {
	console.log('lon1: ' + lon1 + ' lat1: ' + lat1 + ' lon2:' + lon2 + ' lat2: ' + lat2 );
	var R = 6371; // earth's radius in km
	var d = Math.acos(Math.sin(lat1)*Math.sin(lat2) + 
	                  Math.cos(lat1)*Math.cos(lat2) *
	                  Math.cos(lon2-lon1)) * R;
	console.log('The two locations are ' + d + ' km apart.');
	return d < maxDistance;
}


