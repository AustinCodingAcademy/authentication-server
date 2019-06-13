const User = require("../models/UserModel");
const bycrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

function authentication(request, response,next) {
  const token = token = require.header("token");
  try{
    var userObj = jwt.verify(token,"hsdcuy567hbdjbu78y378");
    //the token is good
    next()
  } 
  catch{
    //there was an error
    response.send("Unathorized")
  }
  return;
  User.findOne({username:username},(err,user) => {
    if(user && bycrypt.compareSync(password,user.password)){
      next();
    }
    else {
      response.send("Unauthorized")
    }
  })
}

exports.authentication = authentication;
