const mongoose = require('mongoose')

const { Schema } = mongoose
const buildSchema = Schema({
  code: String,
  name: { type: String },
  floor: Number,
  rooms: [{ type: Schema.Types.ObjectId, ref: 'Room', default: [] }],
  institution: { type: Schema.Types.ObjectId, ref: 'Institution' }
})

module.exports = mongoose.model('Building', buildSchema)
