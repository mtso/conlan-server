
const Component = require('./Component');

/**
 * Base Entity object. Contains an array of components. 
 * Use the function add(componentToAdd:) to safeguard against duplicate components.
 */

function Entity() {
  this._components = [];
}

/*
 * 
 */

// Entity.prototype.constructor = Entity;


Entity.prototype.add = function(componentToAdd) {
  if (this._components.length > 0) {
    for (var component of this._components) {
      if (Object.getPrototypeOf(component).isPrototypeOf(componentToAdd)) {
        console.log('Add failed, component type exists');
        return;
      }
    }
  }

  if (Component.prototype.isPrototypeOf(componentToAdd)) {
    this._components.push(componentToAdd);
  } else {
    console.log('Add failed, componentToAdd is not a Component');
  }
};


Entity.prototype.componentOfType = function(componentType) {
  for (var component of this._components) {
    if (componentType.prototype.isPrototypeOf(component)) {
      return component;
    }
  }
  return undefined;
};


Entity.prototype.update = function(deltaTime) {
  for (var component of this._components) {
    component.update(deltaTime);
  }
}


module.exports = Entity;
