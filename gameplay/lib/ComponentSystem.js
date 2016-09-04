
const Component = require('./Component');


function ComponentSystem(componentType) {
  this._components = new Set();
  this._componentType = componentType;
}


ComponentSystem.prototype.add = function(component) {
  if (!this._componentType.prototype.isPrototypeOf(component)) { return }
  if (this._components.has(component)) { return; }

  return this._components.add(component);  
};


ComponentSystem.prototype.addComponentFrom = function(entity) {
  for (var component of entity._components) {
    this.add(component);
  }
}


ComponentSystem.prototype.remove = function(component) {
  return this._components.delete(component);
}


ComponentSystem.prototype.removeComponentFrom = function(entity) {
  for (var component of entity._components) {
    // this.remove(component);
    console.log(this.remove(component));
  }
}


ComponentSystem.prototype.update = function(deltaTime) {
  this._components.forEach(function(component) {
    component.update(deltaTime);
  });
}


module.exports = ComponentSystem;