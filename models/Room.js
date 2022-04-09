const mongoose = require('mongoose')

const { Schema } = mongoose
const roomSchema = Schema({
  code: String,
  name: String,
  equipment: String,
  capacity: { type: Number, default: 50 },
  floor: Number,
  building: { type: Schema.Types.ObjectId, ref: 'Building' },
  approveres: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }]
})

module.exports = mongoose.model('Room', roomSchema)
