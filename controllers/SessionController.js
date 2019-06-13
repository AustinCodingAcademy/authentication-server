const User = require("../models/UserModel");
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
//const tokenForUser = require("../services/token").tokenForUser;
//const compare = require("../services/hash").compare

function create(request, response) {
    const {username, password } = request.body;
    User.findOne({username:username},(err,user) => {
        if(user && bycrypt.compareSync(password,user.password)){
            //this user is good, what do we need to do?
            //we need to create and send back a token
            const timestamp = new Date().getTime();
            const userObj = { userId: user.id, iat:timestamp};
            var token = jwt.sign(userObj,"hsdcuy567hbdjbu78y378");
            response.json({token:token})
            next();
        }
        else {
          response.send("Username not found")
        }
    })
}
  
exports.create = create;
