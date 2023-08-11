/*
HTTP Request: 
1. GET: request a resource from the server
2. POST: sending a resource to the server. e.g. a piece of info
3. PUT: replace resource completely
4. PATCH: patch up a resource
5. DELETE: delete a resource 

Nodemon is a tool that helps to restart the node application automatically when files changes in the directory are detected. 
> npm install -g nodemon  //g=install the tool globally to your pc
> nodemon index.js
*/


import express from "express";
const app = express();
const port = 3000; 

app.get("/",(req,res)=>{ //localhost:3000/ , '/' = root, homepage
    //console.log(req.rawHeaders);
    res.send("<h1>Hello</h1>");
});

app.get("/about",(req,res)=>{
    res.send("<h1>About Me</h1><p>My name is Teresa</p>")
});
app.get("/contact",(req,res)=>{
    res.send("<h1>Contact Me</h1><p>Phone: xxx-xxx-xxxx</p>")
});
app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});