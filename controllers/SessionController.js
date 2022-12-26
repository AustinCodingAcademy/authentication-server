
const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const user = require("../models/UserModel");
var jwt = require('jsonwebtoken');


function create(request, response) {
    const { username, password } = request.body;

    User.findOne({ username:username}, (err, user) =>{
        //comparing password entered by user to hashed password in database
        if(user && bcrypt.compareSync(password, user.password)){
          //this user is good
          //we need to create and send back a token
          const timestamp = new Date().getTime();
          const userObj= {userId:user.id, iat:timestamp };
          
          // Signing is creating a token from an object
          // takes the user object and the pass key, used to lock and unlock
          var token = jwt.sign( userObj , 'flsdfjsdlfjsdlfldj');

          response.json({token:token});
         // response.json(token);
        }
        else{
          response.send("Unauthorized")
        }
    
      })

 
}
  
exports.create = create;
