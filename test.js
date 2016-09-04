
const HealthComponent = require('./gameplay/components/HealthComponent');
const EnergyComponent = require('./gameplay/components/EnergyComponent');
const ComponentSystem = require('./gameplay/lib/ComponentSystem');
const Entity          = require('./gameplay/lib/Entity');


var player = new Entity();
var healthComponent = new HealthComponent(100);
var healthComponentCopy = new HealthComponent(100);
var energyComponent = new EnergyComponent(50);
var healthSystem = new ComponentSystem(HealthComponent);


player.add(healthComponent);
player.add(healthComponent);
player.add(healthComponentCopy);
player.add(energyComponent);


healthSystem.addComponentFrom(player);
healthSystem.add(healthComponent);
healthSystem.add(healthComponentCopy);
healthSystem.add(energyComponent);


// healthSystem.remove(healthComponent);
// healthSystem.removeComponentFrom(player);


console.log(player);
console.log(healthSystem);


healthSystem.update(20);