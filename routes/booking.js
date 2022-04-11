const express = require('express')
const router = express.Router()
const Booking = require('../models/Booking')

router.get('/', async (req, res, next) => {
  try {
    const startDate = req.query.startDate
    const endDate = req.query.endDate
    const booking = await Booking.find({
      $or: [{ startDate: { $gte: startDate, $lt: endDate } },
        { endDate: { $gte: startDate, $lt: endDate } }]
    }).populate('room').populate('user').populate('approveres').exec()
    res.status(200).json(booking)
  } catch (err) {
    return res.status(500).send({
      message: err.message
    })
  }
})

module.exports = router
