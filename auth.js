var basicAuth = require('basic-auth');

module.exports = function (req, res, next) {
  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    //  res.send(401);
    return res.send(401,'Unhautorized section');
  };

  var user = basicAuth(req);

  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  };

  if (user.name === 'admin' && user.pass === 'admin') {
    return next();
  } else {
    return unauthorized(res);
  };
};

