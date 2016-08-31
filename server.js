/*
 *  Conlan Game Server
 *  Matthew Tso, 2016
 *
 *  Server process
 */

/// Require
const app  = require('express')();
const http = require('http').Server(app);
const io   = require('socket.io')(http);
const fs   = require('fs');
const Simulation = require('./simulation.js');


/// Local variables
var users = [];


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});


http.listen(3000, function() {
    console.log('Listening on *:3000');

    fs.readFile('users.json', 'utf8', function(error, data) {
    	if (error) { return console.log(error); }

    	users = JSON.parse(data);
    	for (i in users) {
    		users[i].isConnected = false;
    	}
    });
});


function saveUsers() {
	var users_json = JSON.stringify(users, null, 2);
	fs.writeFile('users.json', users_json, 'utf8');
};


io.on('connection', function(socket) {

    /// New connection routine
    console.log('A client connected.');
    io.emit('userUpdate', users);


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

	    /// Not found user, create new user.
	    if (!foundUser) {
	        userInfo.name = username;
	        userInfo.id = socket.id;
          userInfo.creation = (new Date).toString();

	        userInfo.isConnected = true;
	        userInfo.balance = 0;
	        userInfo.isInSimulation = false;
	        userInfo.isInParty = false;
	        userInfo.partyMembers = [];

	        users.push(userInfo);
	    }

	    io.emit('userUpdate', users);
	    saveUsers();

    });


    /// Send Quest Data
    socket.on('getQuests', function() {
    	// var data = questsData;
    	// io.to(socket.id).emit('sendQuests', data);
    });


    /// Start a quest simulation with specified user
    socket.on('embarkQuest', function() {

      console.log('Attempting to embark on quest');

      var user = userForID(socket.id);
      if (user && !user.isInSimulation) {
        var simulation = new Simulation(io, user);
      }

    });


    /// Join the party of a user.
    socket.on('joinParty', function(leaderName) {

    });

});



// var simulationManager = io.of('/sim');
// simulationManager.on('connection', function(socket) {
// 	console.log('Simulation Manager')


// });


// var roomCounter = 0;

// function newRoomID() {
// 	return "sim:" + roomCounter++;
// };


function userForID(id) {
	for (var index in users) {
		if (users[index].id == id) {
			return users[index];
		}
	}
	return null;
}

