const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const salt = 8;

function create(request, response, next) {
    let {username, password} = request.body;

    if(!username || !password) {
        response.send('You must enter a username and password!')
    }
    else {
        User.findOne({username:username}, (err, foundUser) => {
            if(foundUser) {
                response.send('Username already exists!');
            }
            else {
                let hash = bcrypt.hash(password, salt);
                let user = new User( {username: username, password: hash} );
                user.save(() => response.send('User saved'))  
            }
        })
    }
}

exports.create = create;
