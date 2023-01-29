const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const nunjucks = require('nunjucks')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')

const app = express()

nunjucks.configure('views', {
	autoescape: true,
	express: app,
})

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/images', express.static((__dirname = 'public/images')))
app.use('/css', express.static((__dirname = 'public/stylesheets')))
app.use('/js', express.static((__dirname = '/public/js')))

app.use('/', indexRouter)
app.use('/users', usersRouter)

module.exports = app
