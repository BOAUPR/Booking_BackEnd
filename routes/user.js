const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Institution = require('../models/Institution')
const { ROLE } = require('../constant.js')

const getAll = async (req, res, next) => {
  try {
    const users = await User.find({ $or: [{ roles: ROLE.USER }, { roles: ROLE.APPROVER }, { roles: ROLE.ADMIN }] }).populate('institution').exec()
    res.status(200).json(users)
  } catch (err) {
    return res.status(500).send({
      message: err.message
    })
  }
}
const getAllIns = async (req, res, next) => {
  const id = req.params.id
  try {
    const users = await User.findById(id).exec()
    const insUser = await User.find({ $or: [{ institution: users.institution, roles: ROLE.USER }, { institution: users.institution, roles: ROLE.APPROVER }] }).populate('institution').exec()
    console.log(users)
    res.status(200).json(insUser)
  } catch (err) {
    return res.status(500).send({
      message: err.message
    })
  }
}

const getApproveres = async (req, res, next) => {
  try {
    const approveres = await User.find({ roles: ROLE.APPROVER }).populate('institution').exec()
    if (approveres === null) {
      return res.status(404).send({
        message: 'Approveres not found'
      })
    }
    res.json(approveres)
  } catch (err) {
    return res.status(404).send({
      message: err.message
    })
  }
}

const getApproveresByID = async (req, res, next) => {
  const id = req.params.id
  try {
    const approveres = await User.find({ roles: ROLE.APPROVER, institution: id }).populate('institution').exec()
    if (approveres === null) {
      return res.status(404).send({
        message: 'Approveres not found'
      })
    }
    res.json(approveres)
  } catch (err) {
    return res.status(404).send({
      message: err.message
    })
  }
}

const getInstitutionByID = async (req, res, next) => {
  const id = req.params.id
  try {
    const institution = await Institution.find({ users: id }).exec()
    if (institution === null) {
      return res.status(404).send({
        message: 'Institution not found'
      })
    }
    res.json(institution[0].name)
  } catch (err) {
    return res.status(404).send({
      message: err.message
    })
  }
}

const getUserByID = async (req, res, next) => {
  const id = req.params.id
  try {
    const user = await User.findById(id).exec()
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

const addUser = async (req, res, next) => {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    surname: req.body.surname,
    roles: req.body.roles,
    institution: req.body.institution
  })
  try {
    await newUser.save()
    res.status(201).json(newUser)
  } catch (err) {
    return res.status(409).send({
      message: err.message
    })
  }
}

const updateUser = async (req, res, next) => {
  const pId = req.params.id
  try {
    const user = await User.findById(pId)
    user.username = req.body.username
    user.password = req.body.password
    user.name = req.body.name
    user.surname = req.body.surname
    user.roles = req.body.roles
    user.institution = req.body.institution
    await user.save()
    return res.status(200).json(user)
  } catch (err) {
    return res.status(404).send({
      message: 'Unable to update ' + pId + ' No object'
    })
  }
}

const updatepatchUser = async (req, res, next) => {
  const pId = req.params.id
  try {
    const user = await User.findById(pId)
    user.name = req.body.name
    user.surname = req.body.surname
    user.roles = req.body.roles
    user.institution = req.body.institution
    await user.save()
    return res.status(200).json(user)
  } catch (err) {
    return res.status(404).send({
      message: 'Unable to update ' + pId + ' No object'
    })
  }
}

const deleteUser = async (req, res, next) => {
  const pId = req.params.id
  try {
    await User.findByIdAndDelete(pId)
    return res.status(200).send()
  } catch (err) {
    return res.status(404).send({
      message: err.message
    })
  }
}
router.get('/approveres', getApproveres)
router.get('/approveres/:id', getApproveresByID)
router.get('/institution/:id', getInstitutionByID)
router.get('/', getAll)
router.get('/Ins/:id', getAllIns)
router.get('/:id', getUserByID)
router.post('/', addUser)
router.put('/:id', updateUser)
router.patch('/:id', updatepatchUser)
router.delete('/:id', deleteUser)

module.exports = router
