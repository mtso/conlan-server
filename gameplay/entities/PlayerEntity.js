
const Entity          = require('../lib/Entity');
const HealthComponent = require('../components/HealthComponent');
const EnergyComponent = require('../components/EnergyComponent');

PlayerEntity = function(name) {
  Entity.call(this);
  this.name = name;

  var healthComponent = new HealthComponent(100);
  var energyComponent = new EnergyComponent(50);
  this.add(healthComponent);
  this.add(energyComponent);
}


PlayerEntity.prototype = Object.create(Entity.prototype);


module.exports = PlayerEntity;
