const express = require('express')
const router = express.Router()
const Booking = require('../models/Booking')

const getAllWaiting = async (req, res, next) => {
  try {
    const booking = await Booking.find({ status: '0' }).populate('room').populate('user').populate('approveres').exec()
    res.status(200).json(booking)
  } catch (e) {
    return res.status(500).send({
      message: e.message
    })
  }
}

const getByDate = async (req, res, next) => {
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
}

const getBookingByUser = async (req, res, next) => {
  try {
    const id = req.params.id
    const booking = await Booking.find({ user: id }).populate('room').populate('user').populate('approveres').exec()
    res.status(200).json(booking)
  } catch (err) {
    return res.status(500).send({
      message: err.message
    })
  }
}

const addBooking = async (req, res, next) => {
  const newBooking = new Booking({
    transactionDate: req.body.transactionDate,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    reason: req.body.reason,
    tool: req.body.tool,
    status: req.body.status,
    order: req.body.order,
    room: req.body.room,
    user: req.body.user,
    approveres: req.body.approveres
  })

  try {
    await newBooking.save()
    res.status(201).json(newBooking)
  } catch (err) {
    return res.status(500).send({
      message: err.message
    })
  }
}

const deleteBooking = async (req, res, next) => {
  const pId = req.params.id
  try {
    await Booking.findByIdAndDelete(pId)
    return res.status(200).send()
  } catch (err) {
    return res.status(404).send({
      message: err.message
    })
  }
}

router.get('/getall', getAllWaiting)
router.get('/', getByDate)
router.get('/users/:id', getBookingByUser)
router.post('/', addBooking)
router.delete('/:id', deleteBooking)

module.exports = router
