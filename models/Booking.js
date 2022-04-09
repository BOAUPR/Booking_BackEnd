const mongoose = require('mongoose')

const { Schema } = mongoose
const eventSchema = Schema({
  transactionDate: Date,
  startDate: Date,
  endDate: Date,
  reason: String,
  tool: String,
  status: { String, default: '0' },
  order: { type: Number, default: 1 },
  room: { type: Schema.Types.ObjectId, ref: 'Room' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  approveres: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }]

}, {
  timestamps: true
})

module.exports = mongoose.model('Booking', eventSchema)
