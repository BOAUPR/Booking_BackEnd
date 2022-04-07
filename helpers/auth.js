const jwt = require('jsonwebtoken')
const User = require('../models/User')
const generateAccessToken = function (user) {
  return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '86400s' })
}

const authenMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (token === null) return res.sendStatus(401)
  jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    const currentUser = await User.findById(user._id).exec()
    req.user = currentUser
    console.log(user)
    next()
  })
}

const authorizeMiddleware = (roles) => {
  return (req, res, next) => {
    for (let i = 0; i < roles.length; i++) {
      if (req.user.roles.indexOf(roles[i]) >= 0) {
        next()
        return
      }
    }
    res.sendStatus(401)
    console.log(req.user)
    next()
  }
}

module.exports = {
  generateAccessToken,
  authenMiddleware,
  authorizeMiddleware
}
