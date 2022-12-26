const tokenForUser = require("../services/authentication.js").tokenForUser;
const hash = require("../services/authentication").hash;
let User = require("../models/UserModel.js");
var bcrypt = require("bcryptjs");

function create(request, response, next) {
  const {username, password } = request.body;

  

  User.findOne({ username: username}, (err, existingUser) => {
    if(existingUser){
      response.send("User already exists")
    } 
    else{
        //save the user with hashed password
        var hash = bcrypt.hashSync(password, 8);
        request.body.password = hash;
        let userObject = {username:username, password:hash};

        let newUser = new User(userObject);
        newUser.save(() => {
            response.send("User created");

        })
    }
        

  });

  
}



exports.create = create;
