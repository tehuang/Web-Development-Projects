import 'dotenv/config';
import express from "express";
import bodyParser from "body-parser";
import mongoose  from "mongoose";
import session from 'express-session';
import passport from 'passport';
import passportLocalMongoose from 'passport-local-mongoose';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

//Setup the session before connect to db
/*
First, we set up the session package and configure it with the initial settings. 
Next, we enable the use of the Passport package and initialize it within our app. 
Finally, we configure our app to utilize Passport and establish a session
*/
app.use(session({
    secret: "Out little secret.",
    resave: false,
    saveUninitialized: false, //Forces an 'uninitialized' session to remain unsaved. This can help reduce server storage usage.
  }))

app.use(passport.initialize()); //Initialize passport package
app.use(passport.session()); //Use passport to deal with the session

//Create a local db
mongoose.connect('mongodb://127.0.0.1:27017/userDB');

//Define user schema
const userSchema = new mongoose.Schema({
    email: String,
    password: String
});


userSchema.plugin(passportLocalMongoose); //Add a username, hash and salt field to store the username, the hashed password and the salt value.

const User = new mongoose.model("User",userSchema);

/*
passport-local-mongoose adds a helper method createStrategy as static method to your schema. The createStrategy is responsible to setup passport-local LocalStrategy with the correct options.
*/
passport.use(User.createStrategy()); //local strategy
passport.serializeUser(User.serializeUser()); //passport-local-mongoose simplifies the code required for serialization and deserialization as mentioned in the Passport documentation.
passport.deserializeUser(User.deserializeUser());


app.get("/", (req, res) => {
    res.render("home.ejs");    
});


app.get("/login", (req, res) => {
    res.render("login.ejs");    
});


app.get("/register", (req, res) => {
    res.render("register.ejs");    
});

app.get("/secrets",(req,res)=>{ 
    if(req.isAuthenticated()){  //This is where we rely on passport, session, passport-local-mongoose to make sure if user is already logged in
        res.render("secrets.ejs");
    }else{
        res.redirect("/login");
    }
});

app.get("/logout",(req,res)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect("/");
      });
});

//Where user register their account
app.post("/register", (req, res) => {
    User.register({username:req.body.username},req.body.password,function(err,user){  //register() method comes from passport-local-mongoose package. It simplifies the process of user registration by handling the creation, saving, and direct interaction with Mongoose
        if(err){
            console.log(err);
            res.redirect("/register");
        }else{
            passport.authenticate("local")(req,res,function(){ //setup a cookie and save user current login session
                res.redirect("/secrets");
            });
        }
    })
});

app.post("/login", (req, res) => {
    const user = new User({
        username:req.body.username,
        password:req.body.password
    });

    req.logIn(user,function(err){ //login() method comes from passport
        if(err){
            console.log(err);
        }else{
            passport.authenticate("local")(req,res,function(){
                res.redirect("/secrets")
            });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });