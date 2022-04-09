const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { generateAccessToken } = require('../helpers/auth')
const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// router.get('/', async (req, res, next) => {
//   try {
//     const users = await User.find({}).exec()
//     res.status(200).json(users)
//   } catch (err) {
//     return res.status(500).send({
//       message: err.message
//     })
//   }
// })

// function generateAccessToken (user) {
//   return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '86400s' })
// }

router.post('/login', async (req, res, next) => {
  const username = req.body.username
  const password = req.body.password
  try {
    const user = await User.findOne({ username: username }).exec()
    const verifyResult = await bcrypt.compare(password, user.password)
    if (!verifyResult) {
      return res.status(404).send({
        message: 'User not found'
      })
    }
    // delete user.password
    const token = generateAccessToken({ _id: user._id, username: user.username })
    console.log(token)
    res.json({ user: { _id: user._id, username: user.username, roles: user.roles }, token: token })
  } catch (err) {
    return res.status(404).send({
      message: err.message
    })
  }
})

module.exports = router
