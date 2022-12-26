// dotenv allows us to declare environment variables in a .env file, \

const path = require('path');
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./routes/UserRoutes");
const sessionRoutes = require("./routes/SessionRoutes");
const authMiddleware = require("./services/authentication").authentication;
let Tweet = require("./models/TweetModel.js");


mongoose.set("debug", true);
mongoose.Promise = global.Promise;

// In case using a local mongodb database
//mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true}).then(
 
//connecting to remote mongodb database
mongoose.connect( process.env.mongodburi, {useNewUrlParser: true}).then( 
  () => { 
    console.log("mongoose connected successfully");
   
    startWebServer();
  },
  err => {
    console.log("mongoose did not connect",err);
   }
);

function startWebServer(){
  const app = express();
  app.get("/api/publicinformation", function (req, res) {
    res.send("Anyone can see this");
  });

  app.use(express.static("public"));
  app.use(bodyParser.json());
  app.use(userRoutes);
  app.use(sessionRoutes);
  app.use(authMiddleware);


    //only logged in users should be able to see this information
  app.get("/api/secretinformation", function (req, res) {
    res.send("You got the data. You are authenticated");
  });
  app.get("/api/secret", function (req, res) {
    res.send(`The current user is ${req.user.username}`);
  });

  app.get("/api/tweets", function(req, res) {
    Tweet.find({ userId:req.userId},(err, tweets) =>{
         res.json(tweets);
    })

  });

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
  });

  //heroku injects the port number into the PORT env value
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`Listening on port:${port}`);
  });
  }