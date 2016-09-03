
const HealthComponent = require('./gameplay/components/HealthComponent');
const EnergyComponent = require('./gameplay/components/EnergyComponent');
const Entity = require('./gameplay/lib/Entity');

var player = new Entity();
var healthComponent = new HealthComponent(100);
var energyComponent = new EnergyComponent(50);

player.add(healthComponent);
player.add(energyComponent);
player.add(energyComponent);

player.update(20);

/*
// module.exports = TestObject;

// function TestObject() {}

// var test1 = new TestObject();
// var test2 = Object.create(TestObject);
// var test3 = Object.create(test2);


var Component = require('./gameplay/lib/Component');
// function Component() {}
// Component.prototype.constructor = Component;

function HealthComponent(health) {
  Component.call(this);
  this.healthValue = health;
}
HealthComponent.prototype = new Component();

HealthComponent.prototype.update = function(deltaTime) {
  console.log('Health component updating with delta time of ' + deltaTime);
}

function EnergyComponent(energy) {
  Component.call(this);
  this.energyValue = energy;
}
EnergyComponent.prototype = new Component();



const Entity = require('./gameplay/lib/Entity');

var player = new Entity();
var healthComponent = new HealthComponent(100);
var energyComponent = new EnergyComponent(50);

player.add(healthComponent);
player.add(energyComponent);
player.add(energyComponent);

player.update()
for (var component of player._components) {
  component.update(20);
}

// var component = player.componentOfType(HealthComponent);

// module.exports = HealthComponent;

// TestObjA.prototype.type = function() {
//   return Object.getPrototypeOf(this);
// }


// function TestObjB() {
//   TestObjA.call(this);
// }

// TestObjB.prototype = Object.create(TestObjA.prototype);
// TestObjB.prototype.constructor = TestObjB;


// function TestObjC() {
//   TestObjB.call(this);
// }
// TestObjC.prototype = Object.create(TestObjB.prototype);
// TestObjC.prototype.constructor = TestObjC;
// // var testObj  = new TestObject();
// // var testObj2 = Object.create(testObj);
// // var testObj3 = Object.create(testObj2);

// // function A() {}
// // var arr = new A();

// var test = new TestObjC();
// var test2 = new TestObjB();

// console.log(Object.getPrototypeOf(test2));

// console.log(Object.getPrototypeOf());
// console.log(Object.getPrototypeOf(Object.getPrototypeOf(test)));
// console.log(Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(test))));




// function Test() {};
// var a = Object.create(Test);
// var b = Object.create(a);

// console.log(b.prototype);



*/