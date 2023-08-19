import { MongoClient } from "mongodb";
// Replace the uri string with your MongoDB deployment's connection string.
const uri = "";
const client = new MongoClient(uri);


//Create a database and insert multiple documents
/*
async function run() {
  try {
    const database = client.db("fruitsDB");
    const collection = database.collection("fruits");
    // create an array of documents to insert
    const docs = [
      { name: "Apple", score: 8, review:"Great fruit"},
      { name: "Orange", score: 6, review:"Kinda sour" },
      { name: "Banana",score: 9, review:"Great stuff!"}
    ];
    // this option prevents additional documents from being inserted if one fails
    const options = { ordered: true };
    const result = await collection.insertMany(docs, options);
    console.log(`${result.insertedCount} documents were inserted`);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
*/


//Find a Document
async function run() {
    try {
      const database = client.db("fruitsDB");
      const collection = database.collection("fruits");
      // Query for a fruit that has the name 'Orange'
      const query = { name: "Orange" };
      const options = {
        // sort matched documents in descending order by rating
        //sort: { "imdb.rating": -1 },
        // Include only the `name` and `review` fields in the returned document
        projection: { _id: 0, name: 1, review: 1 },
      };
      const result = await collection.findOne(query, options);
      // since this method returns the matched document, not a cursor, print it directly
      console.log(result);
    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);

