var express = require('express'),
    app = express.createServer(express.logger()),
    io = require('socket.io').listen(app),
    routes = require('./routes'),
    pg = require('pg');

// Configuration

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
  io.set("close timeout", 5);
}); 


// Routes

var port = process.env.PORT || 5000; // Use the port that Heroku provides or default to 5000
app.listen(port, function() {
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});


app.get('/', routes.index);
app.get('/join', routes.join);
app.get('/create', routes.create);
app.get('/input', routes.input);
app.get('/display', routes.display);

var count = 0;

io.sockets.on('connection', function (socket) {
	count++;
	io.sockets.emit('count', {
		number: count
	});
	socket.on('trigger', function (data) {
		io.sockets.emit('event', data );
	});
	socket.on('disconnect', function () {
	    console.log('DISCONNECTED!!! ');
	    count--;
	    io.sockets.emit('count', {
	        number: count
	    });
	});
});



