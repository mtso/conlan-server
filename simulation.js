
module.exports = Simulation;


function Simulation(room, io, user) {
	this.room = room;
	this.io = io;
	this.user = user;
}


Simulation.prototype.test = function() {
	console.log('test' + this.room + this.user.id);
	// io.emit('simulationMessage', 'what\'s up from simulation');
};