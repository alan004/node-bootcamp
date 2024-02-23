// console.log(arguments)
// console.log(require('module').wrapper);

//module.exports
const C = require('./test-module1.js')
const calc1 = new C();
console.log(calc1.add(2,5))

//exports
// const calc2 = require('./test-module2.js')
const { add, multiply, divide, subtract } = require('./test-module2.js')
console.log(subtract(3,3))

//caching, calling the function right away
require('./test-module3.js')();
require('./test-module3.js')();
require('./test-module3.js')();