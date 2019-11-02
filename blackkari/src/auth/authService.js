const config = require('../config.json')

module.exports = function() {
  this.authenticate = authenticate
}

function authenticate(req, res, next) {
  const appKey = req.query.appKey
  const correctAppKey = config.auth.appKey
  const authEnabled = config.auth.enabled

  if (authEnabled && appKey !== correctAppKey) {
    return res.status(403).end("Forbidden!")
  }
  next()
}
