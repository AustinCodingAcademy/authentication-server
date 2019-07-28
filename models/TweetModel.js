const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    userId: {type: String},
    tweet: {type: String}
})

const Tweet = mongoose.model("Tweet", tweetSchema);

module.exports = Tweet;