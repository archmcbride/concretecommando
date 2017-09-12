// steps to setup this server:
// 1. create "root" folder for the entire project...
// 2. create server.js file in root of directory...  i.e. the "entry point" for the server
// 3. create "public" folder to contain the website files... i.e. what the client has access to
  // 3a. create html, css, js, images folders inside public to hold those files...
// 4. git init...  create repository (creates .git folder)
// 5. create .gitignore file  (ignore node_modules & .DS_Store, whatever else desired...)
// 6. npm init... create node project (answer prompts as needed to create package.json file)
  // 6a. npm install express
  // 6b. npm install body-parser
  // 6c. npm install request
  // 6d. npm install mongoose
// 7. start nodemon to run server...  listening on port defined at bottom of server.js file (e.g. 8080)

// Make sure to set up script/link tags to CSS, JS, Bootstrap, etc


var express = require('express')
var app = express()
app.use(express.static('./public/'))
app.listen(8080)