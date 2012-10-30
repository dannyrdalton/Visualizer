var express = require('express');
/*
var redis = require('redis');
var db = redis.createClient();
*/
var app = express();

app.get('/', function(request, response) {
  response.send('Hello World!');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

/*
app.use(function(req, res, next){
  var min = 60 * 1000;
  var ago = Date.now() - min;
  db.zrevrangebyscore('online', '+inf', ago, function(err, users){
    if (err) return next(err);
    req.online = users;
    next();
  });
});
*/

/*
app.get('/', function(req, res){
  res.send(req.online.length + ' users online');
});
*/

/* app.listen(3000); */

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});