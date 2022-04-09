const express = require('express')
const router = express.Router()
const Room = require('../models/Room')

const getAll = async (req, res, next) => {
  try {
    const rooms = await Room.find({}).exec()
    res.status(200).json(rooms)
  } catch (err) {
    return res.status(500).send({
      message: err.message
    })
  }
}

const getRoomByID = async (req, res, next) => {
  const id = req.params.id
  try {
    const room = await Room.findById(id).exec()
    if (room === null) {
      return res.status(404).send({
        message: 'Room not found'
      })
    }
    res.json(room)
  } catch (err) {
    return res.status(404).send({
      message: err.message
    })
  }
}

const addRoom = async (req, res, next) => {
  const newRoom = new Room({
    code: req.body.code,
    equipment: req.body.equipment,
    capacity: req.body.capacity,
    floor: req.body.floor,
    building: req.body.building,
    approveres: req.body.approveres
  })
  try {
    await newRoom.save()
    res.status(201).json(newRoom)
  } catch (err) {
    return res.status(500).send({
      message: err.message
    })
  }
}

const updateRoom = async (req, res, next) => {
  const pId = req.params.id
  try {
    const room = await Room.findById(pId)
    room.code = req.body.code
    room.equipment = req.body.equipment
    room.approveres = req.body.approveres
    await room.save()
    return res.status(200).json(room)
  } catch (err) {
    return res.status(404).send({
      message: err.message
    })
  }
}

const deleteRoom = async (req, res, next) => {
  const pId = req.params.id
  try {
    await Room.findByIdAndDelete(pId)
    return res.status(200).send()
  } catch (err) {
    return res.status(404).send({
      message: err.message
    })
  }
}

router.get('/', getAll)
router.get('/:id', getRoomByID)
router.post('/', addRoom)
router.put('/:id', updateRoom)
router.delete('/:id', deleteRoom)

module.exports = router
