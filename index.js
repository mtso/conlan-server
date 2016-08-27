var app  = require('express')();
var http = require('http').Server(app);
var io   = require('socket.io')(http);

app.get('/', function(req, res) {
  res.send('<!doctype html><html><body><h1>conlan server</h1><script src="https://cdn.jsdelivr.net/socket.io-client/1.3.2/socket.io.min.js"></script><script>var socket = io();</script></body><html>');
});

http.listen(3000, function() {
  console.log('Listening on *:3000');
});

var i = 0;

io.on('connection', function(socket) {
  console.log('A user connected.');

  socket.join('testroom' + i.toString());

});

var j = 0;

setInterval(function() {
  console.log("Server speaking");
  var currentDateTime = new Date().toLocaleString();
  var message = "Hello guys. This is server speaking."
  io.emit('newChatMessage', "server", message, currentDateTime);
}, 1000);