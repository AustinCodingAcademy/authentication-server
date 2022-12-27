const User = require("../models/UserModel");
//const jwt = require("jwt-simple");
const bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');


function authentication(request, response,next) {

  const token = request.header("token");

try{
  // verify a token symmetric - synchronous
  //validating the token with the pass key
let passKey='flsdfjsdlfjsdlfldj';
var userObject = jwt.verify(token,'flsdfjsdlfjsdlfldj');

 //the token is good
 request.userId = userObject.userId;
 
  next();
}
catch{
   response.send("Unauthorized");
}

 return;
  
  User.findOne({ username:username}, (err, user) =>{
    //comparing password entered by user to hashed password(hashed password) in database
    if(user && bcrypt.compareSync(password, user.password)){
      next();
    }
    else{
      response.send("Unauthorized")
    }

  })
  
}

exports.authentication = authentication;
