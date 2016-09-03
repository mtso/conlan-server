
const Component = require('../lib/Component');


function EnergyComponent(energy) {
  Component.call(this);
  this.energyValue = energy;
}


EnergyComponent.prototype = Object.create(Component.prototype);


module.exports = EnergyComponent;