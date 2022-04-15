const { ROLE } = require('../constant.js')
// const ADMIN = 'ADMIN'
// const USER = 'USER'
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const { Schema } = mongoose
const userSchema = Schema({
  username: { type: String, unique: true },
  password: String,
  name: String,
  surname: String,
  roles: {
    type: [String],
    default: [ROLE.USER]
  },
  institution: { type: Schema.Types.ObjectId, ref: 'Institution' }
})

userSchema.pre('save', function (next) {
  const user = this

  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError)
      } else {
        bcrypt.hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError)
          }

          user.password = hash
          next()
        })
      }
    })
  } else {
    return next()
  }
})

module.exports = mongoose.model('User', userSchema)
