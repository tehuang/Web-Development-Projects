import express from "express";
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import _ from "lodash";
import 'dotenv/config'; //help to access hidden keys in the .env file


const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

//local db 
//mongoose.connect('mongodb://127.0.0.1:27017/todolistDB');

//Atlas MongoDB
const MONGO_URI = `${process.env.MONGO_URI}`;
mongoose.connect(MONGO_URI);

const itemsSchema = new mongoose.Schema({
    name:String
});

const Item = mongoose.model("Item",itemsSchema); 

const item1 = new Item({
    name: "Grab a coffee"
});

const item2 = new Item({
    name:"Go to the gym"
});

const item3 = new Item({
    name:"Watch TV"
});

const defaultItems=[item1,item2,item3];

// const workItems =["Practice Leetcode","Learn Web Development","Prepare CompTIA"];

const listSchema = new mongoose.Schema({
    name:String,
    items:[itemsSchema]
});

const List = mongoose.model("List",listSchema);



app.get("/",function(req, res){
    //Find all the items
    Item.find({}).then(function(foundItems){
        if(foundItems.length===0){ //If there is no item in the collections
            Item.insertMany(defaultItems).then(function(){
                console.log("Successfully saved the default items to database.");
            }).catch(function(err){
            console.log(err);
            });
            res.redirect("/");
        }else{
            res.render("list",{listTitle: "Today", newListItems:foundItems});
        }
        
    }).catch(function(err){
        console.log(err);
    });
});

app.post("/",function(req,res){
    const itemName = req.body.newItem;
    const listName = req.body.list;  //list.ejs : button type="submit" name="list" value=<%= listTitle %>>+</button>

    const item = new Item({
        name: itemName
    });

    if(listName==="Today"){ //To check if it's the default list
        item.save();
        res.redirect("/");
    }else{ //If it's a custom list
        List.findOne({name:listName}).then(function(foundList){
            foundList.items.push(item);
            foundList.save();
            res.redirect("/"+ listName);
        }).catch(function(err){
            console.log(err);
        });
    }
    
});

app.post("/delete",function(req,res){
    const checkedItemId = req.body.checkbox;
    const listName = req.body.listName;

    if(listName==="Today"){
        Item.findByIdAndRemove(checkedItemId).then(function(){
            console.log("Successfully deleted checked item.");
            res.redirect("/");
        }).catch(function(err){
            console.log(err);
        });
    }else{
        List.findOneAndUpdate({name:listName},{$pull:{items:{_id:checkedItemId}}}).then(function(foundList){
            res.redirect("/"+listName);
        }).catch(function(err){
            console.log(err);
        });
    }
});

app.get("/:customListName",function(req,res){
    const customListName = _.capitalize(req.params.customListName); //Use Lodash to capitalie the first character
    if(customListName==="About"){
        res.render("about.ejs");
    }else{
        List.findOne({name:customListName}).then(function(foundList){
            if(foundList){
                //Show an existing list
                //console.log("Exists!");
                res.render("list.ejs",{listTitle:foundList.name, newListItems: foundList.items})
            }else{
                //Create a list
                const list = new List({
                    name:customListName,
                    items:defaultItems
                });
                list.save();
                res.redirect("/"+customListName);
            }
        }).catch(function(err){
            console.log(err);
        });
    }
    

});

// app.get("/about",function(req,res){
//     res.render("about.ejs");
// });

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });