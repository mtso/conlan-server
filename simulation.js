

const crypto = require('crypto');

const UPDATE_INTERVAL = 35;


module.exports = Simulation;


function Simulation(io, user, callback) {
	this.namespace = generateNamespace();
  this.callback = callback;

	this.users = [];
  this.users.push(user);
  for (var i in user.partyMembers) {
    this.users.push(user.partyMembers[i]);
  }

  // console.log(this.users);
	console.log('Simulation instance created with namespace ' + this.namespace + ' and user ' + this.users[0].name);

	/// Update variables
	this.updateTimer = setInterval(this.update, UPDATE_INTERVAL);

  this.setup(io);
}


/// Sets up the room, adding user, current quest monster
/// Declare and define simulation namespace process
Simulation.prototype.setup = function(io, callback) {

  // this.players = [];
  // for (var user in users) {
  //   var newPlayer = Entity(users[user].name);
  //   this.players.push(newPlayer);
  // }


  /// Needed for sim binding
  var self = this;

  this.sim = io.of(this.namespace);

  this.sim.on('connection', function(socket) {
    console.log('User connected to simulation namespace ' + self.namespace);

    socket.on('joinSimulation', function(username) {
      console.log('User ' + username + ' joins sim');

      // console.log(self.users);

      for (var i in self.users) {
        var user = self.users[i];
        console.log(user);
        if (user.name == username) {
          user.isInSimulation = true;
        }
        self.callback('userUpdate');
      }

      if (allPlayersReady(self.users)) {
        console.log('ready');
        self.beginCountdown();
      } else {
        console.log('not ready');
      }

    });
  });


  // Once set up, broadcast namespace to the users in the party.
  for (var i in this.users) {
    var id = this.users[i].id;
    io.to(id).emit('newSimulationCreated', this.namespace);
  }

}


/// Begin countdown of simulation, syncing all clients to a single time
Simulation.prototype.beginCountdown = function() {
  console.log('countdown beginning');
}


/// Update loop
var previousTime = null;
Simulation.prototype.update = function() {

	var currentTime = new Date().getTime();
	var deltaTime = (!previousTime) ? 0 : currentTime - previousTime;
	previousTime = currentTime;

	// this.monster.update(deltaTime);
}


var increment = 0;
function generateNamespace() {
  const hash = crypto.createHash('sha224').update(((new Date).getTime() + increment++).toString()).digest('base64');
  return "/sim:" + hash.substring(0, 8);
};


function allPlayersReady(users) {
  var ready = true;
  for (var i in users) {
    if (!users[i].isInSimulation) {
      ready = false;
    }
  }
  return ready ? true : false;
}