const mongoose = require('mongoose')

const { Schema } = mongoose
const eventSchema = Schema({
  transactionDate: Date,
  startDate: Date,
  endDate: Date,
  reason: String,
  tool: String,
  status: { type: String, default: '0' },
  room: { type: Schema.Types.ObjectId, ref: 'Room' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  approveres: [{ type: Schema.Types.ObjectId, ref: 'Approver', default: [] }]
}, {
  timestamps: true
})

module.exports = mongoose.model('Booking', eventSchema)
