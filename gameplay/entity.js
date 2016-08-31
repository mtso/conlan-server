

module.exports = Entity;


function Entity() {
  var components = [];


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