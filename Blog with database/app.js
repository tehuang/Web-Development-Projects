import express from "express";
import bodyParser from "body-parser";
import _ from "lodash";
import mongoose from 'mongoose';
import 'dotenv/config'; //help to access hidden keys in the .env file

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI); 

//Define a schema
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required, please try again. "]
  },
  content: {
    type: String,
    required: [true, "Content is required, please try again. "]
  }
});

//Create a new mongoose model
const Post = mongoose.model("Post",postSchema);

app.get("/", (req, res) => {
  Post.find({}).then(function(foundPosts){
    console.log(foundPosts);
    res.render("home.ejs",{startingContent:homeStartingContent,posts:foundPosts});
  }).catch(function(err){
    console.log(err); 
  });
  
});


app.get("/about", (req, res) => {
  res.render("about.ejs",{aboutContent:aboutContent});
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs",{contactContent:contactContent});
});

app.get("/compose", (req, res) => {
  res.render("compose.ejs");
});

app.post("/compose", (req, res) => {
  //Create a new post document using mongoose model.
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  //Save the document to db
  //Only redirect to the home page once save is complete with no errors
  post.save().then(function(){
    res.redirect("/");
  }).catch(function(err){
    console.log(err);
  }); 
  
});

/*
=================
Route parameters
=================
Route parameters are named URL segments that are used to capture the values specified at their position in the URL. 
The captured values are populated in the req.params object, with the name of the route parameter specified in the path as their respective keys.

Route path: /users/:userId/books/:bookId
Request URL: http://localhost:3000/users/34/books/8989
req.params: { "userId": "34", "bookId": "8989" }

Reference: https://expressjs.com/en/guide/routing.html
*/
app.get("/posts/:postId", (req, res) => {
  const requestedPostId = req.params.postId;
  // find the post with a matching id in the posts collection
  Post.findOne({_id:requestedPostId}).then(function(result){
    res.render("post.ejs",{title:result.title, content:result.content});
  }).catch(function(err){
    console.log(err);
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});