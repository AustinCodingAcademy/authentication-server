const mongoose = require('mongoose');


var tweetSchema = new mongoose.Schema({
    text: {  
        type: String,
        required: true
    },
    
    userId: {
        type: String,
        unique: false,
        required: true
    }

});


var tweet = mongoose.model('Tweet', tweetSchema);


module.exports = tweet;