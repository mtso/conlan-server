
const Component = require('../lib/Component');


function HealthComponent(health) {
  Component.call(this);
  this.healthValue = health;
}


HealthComponent.prototype = Object.create(Component.prototype);


HealthComponent.prototype.update = function(deltaTime) {
  console.log('Health component updating with delta time of ' + deltaTime);
}


module.exports = HealthComponent;