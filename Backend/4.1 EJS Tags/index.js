/*
EJS Tags
<%= variable %>             //JS Output
<% console.log("hello") %>   //JS Execute
<%- <h1>Hello</h1> %>        //Render HTML
<%% %%>                      //show <% or %>
<%# This is a comment %>     //Stop Execution
<%- include("header.ejs") %> //Insert another EJS file, mostly used in header and footer. 
*/

import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  const data = {
    title: "EJS Tags",
    seconds: new Date().getSeconds(),
    items: ["apple", "banana", "cherry"],
    htmlContent: "<strong>This is some strong text</strong>",
  };
  res.render("index.ejs", data);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
