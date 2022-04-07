const express = require('express')
const router = express.Router()
const Institution = require('../models/Institution')

const getAll = async (req, res, next) => {
  try {
    const institutions = await Institution.find({}).exec()
    res.status(200).json(institutions)
  } catch (err) {
    return res.status(500).send({
      message: err.message
    })
  }
}

const getInstitutionsByID = async (req, res, next) => {
  const id = req.params.id
  try {
    const user = await Institution.findById(id).exec()
    if (user === null) {
      return res.status(404).send({
        message: 'User not found'
      })
    }
    res.json(user)
  } catch (err) {
    return res.status(404).send({
      message: err.message
    })
  }
}

const addInstitution = async (req, res, next) => {
  const newInstitution = new Institution({
    name: req.body.name,
    users: req.body.users
  })
  try {
    await newInstitution.save()
    res.status(201).json(newInstitution)
  } catch (err) {
    return res.status(500).send({
      message: err.message
    })
  }
}

const updateInstitution = async (req, res, next) => {
  const pId = req.params.id
  try {
    const institution = await Institution.findById(pId)
    institution.name = req.body.name
    institution.users = req.body.users
    await institution.save()
    return res.status(200).json(institution)
  } catch (err) {
    return res.status(404).send({
      message: err.message
    })
  }
}

const deleteInstitution = async (req, res, next) => {
  const pId = req.params.id
  try {
    await Institution.findByIdAndDelete(pId)
    return res.status(200).send()
  } catch (err) {
    return res.status(404).send({
      message: err.message
    })
  }
}

router.get('/', getAll)
router.get('/:id', getInstitutionsByID)
router.post('/', addInstitution)
router.put('/:id', updateInstitution)
router.delete('/:id', deleteInstitution)

module.exports = router
