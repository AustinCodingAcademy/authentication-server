const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function create(request, response) {
    let {username, password} = request.body;
    User.findOne({username:username}, (err, foundUser) => {
        if( foundUser && bcrypt.compareSync(password, foundUser.password) ) {
            let id = foundUser._id;
            let token = jwt.sign({userId: id}, 'secretkey');
            response.json({token:token});
        }
        else {
            response.send('username or password is incorrect') 
        };

    })
}
  
exports.create = create;
