const express = require('express')
const router = express.Router()
const Building = require('../models/Building')

const getAll = async (req, res, next) => {
  try {
    const building = await Building.find({}).populate('institution').populate('rooms').exec()
    res.status(200).json(building)
  } catch (err) {
    return res.status(500).send({
      message: err.message
    })
  }
}

const getBuildingByID = async (req, res, next) => {
  const id = req.params.id
  try {
    const building = await Building.findById(id).exec()
    if (building === null) {
      return res.status(404).send({
        message: 'Building not found'
      })
    }
    res.json(building)
  } catch (err) {
    return res.status(404).send({
      message: err.message
    })
  }
}

const getBuildingByRoom = async (req, res, next) => {
  const id = req.params.id
  try {
    const building = await Building.find({ room: id }).exec()
    if (building === null) {
      return res.status(404).send({
        message: 'Building not found'
      })
    }
    res.json(building)
  } catch (err) {
    return res.status(404).send({
      message: err.message
    })
  }
}

const updateBuilding = async (req, res, next) => {
  const pId = req.params.id
  try {
    const building = await Building.findById(pId)
    building.code = req.body.code
    building.name = req.body.name
    building.floor = req.body.floor
    await building.save()
    return res.status(200).json(building)
  } catch (err) {
    return res.status(404).send({
      message: err.message
    })
  }
}

router.get('/', getAll)
router.get('/:id', getBuildingByID)
router.get('/room/:id', getBuildingByRoom)
router.put('/:id', updateBuilding)

module.exports = router
