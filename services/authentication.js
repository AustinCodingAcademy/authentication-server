const User = require("../models/UserModel");

function authentication(request, response,next) {
  next();
}

exports.authentication = authentication;
