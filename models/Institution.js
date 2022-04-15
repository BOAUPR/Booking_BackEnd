const mongoose = require('mongoose')

const { Schema } = mongoose
const institutionSchema = Schema({
  name: { type: String, unique: true },
  users: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }]
})

module.exports = mongoose.model('Institution', institutionSchema)
