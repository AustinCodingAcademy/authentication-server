const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function authentication(request, response,next) {
  const  token = request.header("token")
  try{
    var userObject = jwt.verify(token, 'dsjf89sdfjkl3jl3j3k2jn');
    //{userId:33}
    //the token is good
    request.userId = userObject.userId;
    next();
  }
  catch{
    response.send("Unauthorized")
  }
  return;
  User.findOne({username:username},(err,user)=>{
    //comparing plain text to the hash
    if(user && bcrypt.compareSync(password, user.password)){
      next();
    }
    else{
      response.send("Unauthorized")
    }
  })
  
}

exports.authentication = authentication;
