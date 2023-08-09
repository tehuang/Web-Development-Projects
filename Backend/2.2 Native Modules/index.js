/*
Native Node Module (預設就有的module可以直接使用. E.g. 就像是電腦預設遊戲，踩地雷，彈珠台)
File System Ref: https://nodejs.org/dist/latest-v18.x/docs/api/fs.html?fbclid=IwAR3j6iNuxWUYNhvKJYTdYOcj5_kvqLIfii_2b7_6aGtYa0A8iAm6TTaboqw#fswritefilefile-data-options-callback
*/

const fs = require("fs"); //Load the module; fs = file system

//Write File
/*
fs.writeFile("message.txt","Hello from NodeJS!",(err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
*/

//Read File
fs.readFile("./message.txt","utf8",(err, data) => { 
  //If no encoding is specified, then the raw buffer is returned. Hence, specifies the encoding to: 'utf8'
    if (err) throw err;
    console.log(data);
  });