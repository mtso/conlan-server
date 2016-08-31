

const crypto = require('crypto');

const UPDATE_INTERVAL = 35;


module.exports = Simulation;


function Simulation(io, user) {
	this.room = generateRoomID();
	this.io = io;

	this.users = [];
  this.users.push(user);
  for (var i in user.partyMembers) {
    this.users.push(user.partyMembers[i]);
  }

	console.log('Simulation instance created with room name ' + this.room + ' and user ' + this.users[0].name);
	this.setup();

	/// Update variables
	this.updateTimer = setInterval(this.update, UPDATE_INTERVAL);

};


/// Sets up the room, adding user, current quest monster
Simulation.prototype.setup = function() {

  this.io.on('connection', function(socket) {
    console.log('Simulation defining new connection event');
    socket.on('joinSimulationRoom', function(roomID) {
      socket.join(roomID);
      console.log('User attempted to join sim through sim*.js')
      this.io.to(this.room).emit('logToConsole', 'Received join request from user ' + socket.id);
    })
  });

  for (var i in this.users) {
    const id = this.users[i].id
    this.io.to(id).emit('newSimulationCreated', this.room);
  }

}


/// Begin countdown of simulation, syncing all clients to a single time
Simulation.prototype.begin = function() {

}


/// Update loop
var previousTime = null;
Simulation.prototype.update = function() {

	var currentTime = new Date().getTime();
	var deltaTime = (!previousTime) ? 0 : currentTime - previousTime;
	previousTime = currentTime;

	// this.monster.update(deltaTime);
}


var roomIncrement = 0;
function generateRoomID() {
  const hash = crypto.createHash('sha224').update(((new Date).getTime() + roomIncrement).toString()).digest('base64');
  return "sim:" + hash.substring(0, 8);
};

