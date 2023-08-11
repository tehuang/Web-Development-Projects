import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));

app.post("/submit",(req,res)=>{
  console.log(req.body);
});

app.get("/", (req, res) => {
  //console.log(__dirname + "/public/index.html");
  res.sendFile(__dirname + "/public/index.html"); //so that you don't need to type out the full path. 
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
