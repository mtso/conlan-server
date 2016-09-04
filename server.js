/*
 *  Conlan Game Server
 *  Matthew Tso, 2016
 *
 *  Server process
 */

// const Entity = require('./gameplay/entity.js');
// var entity = new Entity();
// entity.addComponent('3');

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

// process.env.PORT for dynamic Heroku port
http.listen(process.env.PORT || 3000, function() {
  console.log('Listening on *:3000');

  fs.readFile('users.json', 'utf8', function(error, data) {
  	if (error) { return console.log(error); }

  	users = JSON.parse(data);
  	for (var i in users) {
  		users[i].isConnected = false;
      users[i].isInSimulation = false;

      while (users[i].partyMembers.length > 0) {
        users[i].partyMembers.pop();
      }
  	}
  });
});


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

	    // var userInfo = {};
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
        function newUser(username, socket) {
          return newUser = {
            name: username,
            id: socket.id,
            creation: (new Date).toString(),

            isConnected: true,
            balance: 0,
            isInSimulation: false,
            isInParty: false,
            partyMembers: []
          };    
        }

        users.push( newUser(username, socket) );
	    }

	    io.emit('userUpdate', users);
	    saveUsers();

    });


    /// Refresh data
    socket.on('refresh', function() {
      io.emit('userUpdate', users);
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
      if (!user || user.isInSimulation) 
        { console.log('User ' + socket.id + ' doesn\'t exist or is already in a quest'); return; }

      var simulation = new Simulation(io, user, function(event) {

        switch (event) {
          case "userUpdate":
            io.emit('userUpdate', users);
            break;

          default:
            console.log('\'' + event + '\' simulation flag has not been implemented by server.');
        }
        
      });

    });


    /// Leave simulation
    socket.on('leaveSimulation', function(namespace) {
      socket.leave(namespace);
      for (var i in users) {
        if (users[i].id == socket.id) {
          users[i].isInSimulation = false;
          break;
        }
      }
      io.emit('userUpdate', users);
      console.log(socket.id + ' left ' + namespace);
    });


    /// Join the party of a user.
    socket.on('joinParty', function(leaderName) {
      for (var i in users) {
        var leader = users[i];
        if (leader.name != leaderName) { continue; }
        
        console.log(users[i].partyMembers);

        if (leader.partyMembers.length < 2 && !leader.isInParty) {
          var newMember = userForID(socket.id);
          leader.partyMembers.push(newMember);
          newMember.isInParty = true;
        } else {
          io.to(socket.id).emit('logToConsole', leaderName + '\'s party is full');
        }
        
      }
    });

});


/// == Utilities ==

function saveUsers() {
  var users_json = JSON.stringify(users, null, 2);
  fs.writeFile('users.json', users_json, 'utf8');
};


function userForID(id) {
	for (var index in users) {
		if (users[index].id == id) {
			return users[index];
		}
	}
	return null;
}


// function newUser(username, socket) {
//   return newUser = {
//     name: username,
//     id: socket.id,
//     creation: (new Date).toString(),

//     isConnected: true,
//     balance: 0,
//     isInSimulation: false,
//     isInParty: false,
//     partyMembers: []
//   };    
// }


function userJoinLeader(user, leader) {
  // Return if leader is in party
  if (leader.isInParty) { return; }
  // Return if party is full
  if (leader.partyMembers.length > 1) { return; }

  // Return if user is already in party
  for (var i in leader.partyMembers) {
    if (leader.partyMembers[i].name == user.name) {
      return;
    }
  }
}