const express = require('express')
const router = express.Router()
const Approver = require('../models/Approver')

const getAllByBooking = async (req, res, next) => {
  const id = req.params.id
  try {
    const approveres = await Approver.find({ booking: id }).populate('booking').populate('user').exec()
    res.status(200).json(approveres)
  } catch (err) {
    return res.status(500).send({
      message: err.message
    })
  }
}

const addApprover = async (req, res, next) => {
  const newApprover = new Approver({
    user: req.body.user,
    status: req.body.status,
    booking: req.body.boooking
  })
  try {
    await newApprover.save()
    res.status(201).json(newApprover)
  } catch (err) {
    return res.status(500).send({
      message: err.message
    })
  }
}

const updateStatus = async (req, res, next) => {
  const pId = req.params.id
  try {
    const approver = await Approver.findById(pId)
    approver.status = req.body.status
    await approver.save()
    return res.status(200).json(approver)
  } catch (err) {
    return res.status(404).send({
      message: err.message
    })
  }
}

const deleteApprover = async (req, res, next) => {
  const pId = req.params.id
  try {
    await Approver.findByIdAndDelete(pId)
    return res.status(200).send()
  } catch (err) {
    return res.status(404).send({
      message: err.message
    })
  }
}

router.get('/:id', getAllByBooking)
router.post('/', addApprover)
router.put('/:id', updateStatus)
router.delete('/:id', deleteApprover)

module.exports = router
