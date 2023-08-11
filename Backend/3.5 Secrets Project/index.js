/*
The main goal of this project is to allow the user access to the secret page if they enter the password correctly;
otherwise, they will be directed to the same page. 
The password is ILoveProgramming
*/
/*
bodyParser is now incorporated into the Express module.
So, instead of importing the bodyParser module, we can simply write the code as follows:
> app.use(express.urlencoded({extended:true}));
*/
import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var userIsAuthorized = false; 

app.use(bodyParser.urlencoded({extended:true}));

function passwordCheck(req,res,next){
    const password = req.body["password"];
    if(password==="ILoveProgramming"){
        userIsAuthorized=true;
    }
    next();
}
app.use(passwordCheck);

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/check",(req,res)=>{
    if(userIsAuthorized){
        res.sendFile(__dirname+"/public/secret.html");
    }else{
        res.redirect("/");
    }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
