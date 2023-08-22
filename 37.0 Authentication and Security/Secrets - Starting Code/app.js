import 'dotenv/config';
import express from "express";
import bodyParser from "body-parser";
import mongoose  from "mongoose";
import md5 from 'md5';


const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

//Create a local db
mongoose.connect('mongodb://127.0.0.1:27017/userDB');

//Define user schema

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});


const User = new mongoose.model("User",userSchema);

app.get("/", (req, res) => {
    res.render("home.ejs");    
});


app.get("/login", (req, res) => {
    res.render("login.ejs");    
});


app.get("/register", (req, res) => {
    res.render("register.ejs");    
});

//Where user register their account
app.post("/register", (req, res) => {
    const newUser = new User({
        email:req.body.username,
        password: md5(req.body.password) //Use md5 to hash the password
    });
    newUser.save().then(function(){
        res.render("secrets.ejs");  //We render the secret page unless the user has registered their account
    }).catch(function(err){
        console.log(err);
    });
});
app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = md5(req.body.password);
    
    User.findOne({email:username}).then(function(foundUser){
        if(foundUser.password===password){
            res.render("secrets.ejs");
        }
    }).catch(function(err){
        console.log(err);
    }); 
    
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });