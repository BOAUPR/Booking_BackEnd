const mongoose = require('mongoose')

const { Schema } = mongoose
const institutionSchema = Schema({
  name: String,
  users: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }]
})

module.exports = mongoose.model('Institution', institutionSchema)
