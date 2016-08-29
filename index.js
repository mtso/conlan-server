var fs   = require('fs');
var app  = require('express')();
var http = require('http').Server(app);
var io   = require('socket.io')(http);

var Simulation = require('./simulation');

var users = [];


app.get('/', function(req, res) {
    res.send('<!doctype html><html><body><h1>conlan server</h1><script src="https://cdn.jsdelivr.net/socket.io-client/1.3.2/socket.io.min.js"></script><script>var socket = io();</script></body><html>');
});


http.listen(3000, function() {
    console.log('Listening on *:3000');
    console.log(newRoom());

    fs.readFile('users.json', 'utf8', function(error, data) {
    	if (error) { return console.log(error); }

    	users = JSON.parse(data);
    	for (i in users) {
    		users[i].isConnected = false;
    	}


		var simulation = new Simulation(3, io, users[0]);
		simulation.test();
		console.log(newRoom());

    });



});


function saveUsers() {
	var users_json = JSON.stringify(users, null, 2);
	fs.writeFile('users.json', users_json, 'utf8');
};


io.on('connection', function(socket) {
    console.log('A client connected.');
    io.emit('userUpdate', users);


    /// Signin
    socket.on('signin', function(username) {

	    var message = "User " + username + ":" + socket.id + " was connected.";
	    console.log(message);

	    var userInfo = {};
	    var foundUser = false;

	    for (i in users) {
	        if (users[i].name == username) {
	            users[i].isConnected = true;
	            users[i].id = socket.id;

	            foundUser = true;
	            break;
	        }
	    }

	    if (!foundUser) {
	        userInfo.name = username;
	        userInfo.id = socket.id;
	        userInfo.isConnected = true;
	        userInfo.balance = 0;

	        users.push(userInfo);
	    }

	    io.emit('userUpdate', users);
	    saveUsers();

    });

    /// Disconnect
    socket.on('disconnect', function() {

	    var diconnectingUser;

	    for (i in users) {
	        if (users[i].id == socket.id) {
	            users[i].isConnected = false;
	            diconnectingUser = users[i].name;
	        }
	    }

	    var message = "User " + diconnectingUser + " disconnected.";
	    console.log(message);
	    io.emit('userUpdate', users);
	    saveUsers();

    });


    /// Send Quest Data
    socket.on('getQuests', function() {


    });


    socket.on('embarkQuest', function() {

    	// var room = newRoom();

    })

});


var roomCounter = 0;
function newRoom() {
	return "sim:" + roomCounter++;
};


// var Simulation = require('./simulation');
// var simulation = new Simulation(3, io, users[0]);
// simulation.test();

