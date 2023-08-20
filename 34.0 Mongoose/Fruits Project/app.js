import mongoose from 'mongoose';
mongoose.connect('mongodb://127.0.0.1:27017/fruitsDB');

//Define a schema
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please check your data entry, no name specified!"] //Validation
  },
  rating: {
    type: Number,
    min:1,
    max:10
  },
  review: String
});

const Fruit = mongoose.model("Fruit",fruitSchema);
const fruit = new Fruit({
  name: "Apple",
  rating: 6, 
  review: "Peach is amazing"
});
//fruit.save(); 

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFruit:fruitSchema //Embedding a schema within another schema to establish a relationship
});

const Person = mongoose.model("Person", personSchema);

const mango = new Fruit({
  name: "Mango",
  rating: 6, 
  review: "Decent fruit."
});
mango.save(); 

/*
const pineapple = new Fruit({
  name: "Pineapple",
  rating: 9, 
  review: "Great fruit."
})
pineapple.save(); 

const person = new Person({
  name: "John",
  age: 37
});
*/

Person.updateOne({name:"John"},{favoriteFruit:mango}).then(function(){
  console.log("Successfully updated the data!");
}).catch(function(err){
  console.log(err);
});

/*
const person = new Person({
  name: "Amy",
  age: 12,
  favoriteFruit:pineapple
});
person.save();
*/
/*
//Insert several documents at a time

const kiwi = new Fruit({
  name: "Kiwi",
  rating: 10, 
  review: "The best fruit!"
});

const orange = new Fruit({
  name: "Orange",
  rating: 4,
  review: "Too sour for me"
});

const banana = new Fruit({
  name: "Banana",
  rating: 3,
  review: "Weird texture"
});

Fruit.insertMany([kiwi,orange,banana]).then(function(){
  console.log("Success");
}).catch(function(err){
  console.log(err);
});

*/

//Find document from your database
Fruit.find({}). then(function(fruits){
  //mongoose.connection.close(); //Close the connection once we are done
  fruits.forEach((fruit)=>{
    console.log(fruit.name);
  });
}).catch(function(err){
  console.log(err);
}); 

//Update document; first specify the condition, second specify the data you want to update
/*
Fruit.updateOne({_id: "64e27ad3d324a5edd19716ab"},{name:"Peach"}).then(function(){
  console.log("Successfully updated the doc!");
}).catch(function(err){
  console.log(err);
});
*/

//Delete one document
/*
Fruit.deleteOne({name:"Peach"}).then(function(){
  console.log("Data deleted!");
}).catch(function(err){
  console.log(err);
});
*/

//Delete multiple documents
/*
Person.deleteMany({name:"John"}).then(function(){
  console.log("Data deleted!");
}).catch(function(err){
  console.log(err);
});
*/