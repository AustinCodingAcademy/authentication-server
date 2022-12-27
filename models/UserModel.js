const mongoose = require('mongoose');
//const Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
    username: {  
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    
    password: {
        type: String,
        required: true
    }

});


var user = mongoose.model('User', userSchema);


module.exports = user;