const mongoose = require('mongoose')

const { Schema } = mongoose
const approverSchema = Schema({
  status: { type: String, default: '0' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  booking: { type: Schema.Types.ObjectId, ref: 'Booking' }
})

module.exports = mongoose.model('Approver', approverSchema)
