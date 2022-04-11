const mongoose = require('mongoose')

const { Schema } = mongoose
const buildSchema = Schema({
  code: String,
  name: { type: String },
  floor: Number,
  rooms: [{ type: Schema.Types.ObjectId, ref: 'Room', default: [] }],
  institution: { type: Schema.Types.ObjectId, ref: 'Institution', default: {} }
})

module.exports = mongoose.model('Building', buildSchema)
