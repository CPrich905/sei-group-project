const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')
const User = require('../models/user')

function secureRoute(req, res, next) {
  if (!req.headers.authorization) throw new Error('Not Found')
  const token = req.headers.authorization.replace('Bearer ', '')
  console.log(token)
  new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, payload) => {
      if (err) return reject(err)
      return resolve(payload)
    })
  })
    .then(payload => User.findById(payload.sub))
    .then(user => {
      if (!user) return res.status(401).json({ message: 'Unauthorized' })
      req.currentUser = user
      next()
    })
    .catch(next)
}

module.exports = secureRoute