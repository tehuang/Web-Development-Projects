/*
NPM (Node Package Manager) (Open Source, Shared code Library)
> npm -init  //Setup package.json file. Configuration file. 
> npm install <Package name>   //install NPM package
  e.g. npm i sillyname  //i=install
  package will be added to the 'dependencies' section in the package.json file.
  Meanwhile, the 'sillyname' module will be downloaded and saved in the 'node_modules' directory. 
*/


/*
CJS = CommonJS, which use 'require' method. 
ESM = ECMAScript Module, which use 'import" to replace 'require' method. 

ESM helps standardize consistency between the frontend and backend. 
> Go to: package.json，在main底下新增: "type": "module",
> Then, go back to: index.js and enter: import xxx from "sillyname"; 
*/

//var generateName = require('sillyname');
import generateName from "sillyname";
var sillyName = generateName();

console.log(`My name is ${sillyName}.`);


//const superheroes = require('superheroes');
import superheroes from "superheroes";
const name =superheroes.random(); 
console.log(`I am ${name}!`);
