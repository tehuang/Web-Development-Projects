/*Backend = Node.js + Express [Express is a framework]
Node allows you to run JavaScript on any computer. 
比喻: JS像是螺絲，Node就像是螺絲刀，Express就像是電動螺絲刀，雖然不是必須，但是有了它會非常方便. Express makes things quicker and easier. 

Advantage of using Express: 
1. Readability
2. Less code
3. Ability to add middleware

Creating an Express Server: 
1. Create directory  //mkdir "name"
2. Create index.js file  //touch "index.js"
3. Initialize NPM  //npm init -y
4. Install the Express package  //npm i express , add type:'module' in package.json
5. Write Server application in index.js
6. Start server //node index.js
*/

import express  from "express";
const app = express(); 
const port = 3000; 

app.listen(port,()=>{  // 1.Port number: 3000  2. Call back function: triggered when everything is setup.
    console.log(`Server running on port ${port}.`);
});