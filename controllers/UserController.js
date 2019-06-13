let User = require("../models/UserModel");
var bcrypt = require("bcryptjs");

function create(request, response, next) {
    let {username,password} = request.body;
    User.findOne({username:username},(err,user) =>{
        if(user){
            response.send("This username already exists!")
        }
        else{
            var hash = bcrypt.hashSync(password, 8);
            request.body.password = hash;
            let userObject = {username:username, password:hash}
            let user = new User(userObject);
            user.save(() =>{
                response.send("user created")
            });
        }
    })
}


exports.create = create;
