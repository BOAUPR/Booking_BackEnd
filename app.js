const express = require('express')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
mongoose.connect('mongodb://localhost:27017/project')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/user')
const authRouter = require('./routes/auth')
const { authenMiddleware, authorizeMiddleware } = require('./helpers/auth')
const { ROLE } = require('./constant')

const app = express()
app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', authenMiddleware, authorizeMiddleware([ROLE.ADMIN, ROLE.LOCAL_ADMIN]), usersRouter)
app.use('/auth', authRouter)

module.exports = app
