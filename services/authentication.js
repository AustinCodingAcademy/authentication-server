const jwt = require('jsonwebtoken');

function authentication(request, response,next) {
  const token = request.header('token');

  try {
    let userObj = jwt.verify(token, 'secretkey');
    next();
  }

  catch {
    response.json('unauthorized');
  }

  return;
}

exports.authentication = authentication;
