import express from "express";
import bodyParser from "body-parser";
import {getDate,getDay} from "./date.js";

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

//Create array to save item
const items =["Grab a coffee","Go to the gym","Watch TV"];
const workItems =["Practice Leetcode","Learn Web Development","Prepare CompTIA"];

app.get("/",function(req, res){
    const day = getDate();
    res.render("list",{listTitle:day, newListItems:items});
});

app.post("/",function(req,res){
    const item = req.body.newItem;

    if(req.body.list ==="Work"){
        workItems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work",function(req,res){
    res.render("list",{listTitle:"Work List",newListItems:workItems});
});


app.get("/about",function(req,res){
    res.render("about");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });