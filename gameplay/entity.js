

module.exports = Entity;


function Entity() {
  this._components = [];


  this.addComponent = function(component) {
    console.log(component);
    components.push('1');
    console.log(components[0]);
  }

}


// Entity.prototype.addComponent = function(component) {
//   console.log(component);
//   this.components.push('1');
//   console.log(this.components[0]);
// }

Entity.prototype.componentOfType = function(componentType) {

}

Entity.prototype = {
  componentOfType : function(componentType) {
    for (var component in components) {
      if (component instanceof componentType) {
        return component;
      }
    }
  }
};


var Entity = {
  
}