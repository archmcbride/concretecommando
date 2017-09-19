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
//8. SUDO MONGOD to start db
// Make sure to set up script/link tags to CSS, JS, Bootstrap, etc

var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var sessionsModule = require('client-sessions')
var ObjectId = require('mongodb').ObjectId
app.use(sessionsModule({
    cookieName: 'auth-cookie',  // front-end cookie name
    secret: 'DR@G0N$',        // the encryption password : keep this safe
    requestKey: 'session',    // we can access our sessions at req.session,
    duration: (86400 * 1000) * 7, // one week in milliseconds
    cookie: {
        ephemeral: false,     // when true, cookie expires when browser is closed
        httpOnly: true,       // when true, the cookie is not accesbile via front-end JavaScript
        secure: false         // when true, cookie will only be read when sent over HTTPS
    }
})) // encrypted cookies!


app.use(express.static('./public/'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/concretecommando')

// make this available to our users in our Node applications (https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications)

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

// USER DB SCHEMA
var userSchema = new mongoose.Schema({
    // name: String, // we think we don't need this 8/21
    username: { type: String, required: true, unique: true }, // Q for Eddie - why lowercase?
    password: { type: String, required: true },
    // projects: { type: Array, required: true},
    //progress: [{ type: mongoose.Schema.Types.ObjectId}] 

  // we'll need some error handling for duplicate usernames and emails
})

var Schema = mongoose.Schema;
var Client = mongoose.model('Client', userSchema); // 'client' is sigular version of the collect in the DB, so it refers to objects (singular) in the DB.

var projectSchema = new mongoose.Schema ({
	userId: {type: Schema.Types.ObjectId},
	projectname: {type: String},
	cost: {type : Number},
	startdate: {type: Date},
})

var Project = mongoose.model ('Project', projectSchema);

app.get('/', function(req, res){
    res.sendFile('./index.html', {root: './public'})
})

//set up new client
app.post('/client', function(req, res, next){
	//console.log(this.db.Client)
    //console.log(req.body.username, 'req username')//logged in terminal
    //console.log(req.body.password, 'req password')
    var user = new Client({username: req.body.username, password: req.body.password})
    user.save(function(err){
        if (err){ next(err) }
        req.session._id = data._id
        res.send({success:'Successfully saved new client!'})
    })

})
//Check to see if user is logged in
app.post('/signin-user', function(req, res, next){
    // console.log('#1:server.js', req.body)
    //our mongoose schema should handle converting the age string to a number
    Client.findOne({username: req.body.username}, function(err, data){
        if (err){ next(err) }
        else if (data) {
            //console.log('server.js ', data)
            req.session._id = data._id
            res.status(200).send(data)
        } else {
            res.send({failure:'Failed to login'})
        }
    })
})
//create project information in database (from concretecommando admins)
app.post('/create-project', function(req, res, next){
    console.log(req.body)
    req.body.userId=req.session._id
    console.log('server side', req.body.userId)
    var newProject = new Project(req.body)
    newProject.save(function(err){
        if (err){ next(err) }
        else {
            //res.send({success:'Successfully entered a project!'})
            res.send(req.body)
        }
        //push the project onto the user id so projects are all linked together 
    })

})

// app.get('/me', function(req, res){
//     res.send(user)
// })

app.get('/projects', function(req, res, next){
	// console.log(req.session._id, 'PASSPORT PLZ')
    Project.find({userId: ObjectId(req.session._id)}, function(err, data){
        if (err) { console.log(err) }

        	// console.log('hi')
        	// console.log(data, 'dataaaaaa')
            res.send(data)

    })
})

// (R)ead all items
// app.get('/read-data', function(req, res, next){
//     console.log(data)
//     Project.find({}, function(err, data){
//         if (err) { next(err) }
//         else {
//             res.send(data)
//         }
//         // console.log(data)
//     })
// })


// 500 error handler
// because we use 4 parameters instead of 2 or 3, express sees this as error-handling middleware
app.use(function(err, req, res, next){
    console.log('something went wrong: ', err)
    res.send(err)
})




module.exports = {client: Client, Project: Project}


app.listen(8080)