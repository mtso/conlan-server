var app  = require('express')();
var http = require('http').Server(app);
var io   = require('socket.io')(http);

app.get('/', function(req, res) {
  res.send('<!doctype html><html><body><h1>conlan server</h1><script src="https://cdn.jsdelivr.net/socket.io-client/1.3.2/socket.io.min.js"></script><script>var socket = io();</script></body><html>');
});

http.listen(3000, function() {
  console.log('Listening on *:3000');
});

io.on('connection', function(socket) {
  console.log('A client connected.');

  socket.on('signin', function(username) {
  });

});
