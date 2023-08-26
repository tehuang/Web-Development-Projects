import emojipedia from "./emojipedia";
//var numbers = [3, 56, 2, 48, 5];

//Map -Create a new array by doing something with each item in an array.
/*
const newNumbers = numbers.map(function (x) {
  return 2 * x;
});
console.log(newNumbers);
*/
//Filter - Create a new array by keeping the items that return true.
/*const newNumbers = numbers.filter(function (x) {
  return x > 10;
});
console.log(newNumbers);
*/
//Reduce - Accumulate a value by doing something to each item in an array.
/*
var newNumber = numbers.reduce(function (accumulator, currentNumber) {
  return accumulator + currentNumber;
});
console.log(newNumber);
*/

//Find - find the first item that matches from an array.
/*
const newNumber = numbers.find(function (x) {
  return x > 10;
});
console.log(newNumber);
*/

//FindIndex - find the index of the first item that matches.
/*const newNumber = numbers.findIndex(function (x) {
  return x > 10;
});
console.log(newNumber);
*/

var arr = [];
emojipedia.map(function (emojiEntry) {
  return arr.push(emojiEntry.meaning.substring(0, 100));
});

console.log(arr);
