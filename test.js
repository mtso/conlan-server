
const HealthComponent = require('./gameplay/components/HealthComponent');
const EnergyComponent = require('./gameplay/components/EnergyComponent');
const ComponentSystem = require('./gameplay/lib/ComponentSystem');
const PlayerEntity    = require('./gameplay/entities/PlayerEntity');


var player = new PlayerEntity('player1');

var componentSystems = [new ComponentSystem(HealthComponent), 
                        new ComponentSystem(EnergyComponent)];

for (var componentSystem of componentSystems) {
  componentSystem.addComponentFrom(player);
}

for (var componentSystem of componentSystems) {
  componentSystem.update(20);
}