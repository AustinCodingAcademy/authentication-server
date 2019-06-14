const Tweet = require('../models/TweetModel');
const jwt = require('jsonwebtoken');

const retrieve = (request, response, next) => {
    let token = request.header('token');
    let user = jwt.verify(token, 'secretkey');
    let id = user['userId'];
    Tweet.find({userId:id}, (err ,docs) => {
        response.send(docs);
    })
}

exports.retrieve = retrieve;