const express = require('express')
const app = express()
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const nunjucks = require('nunjucks')

const session = require('express-session')
app.use(
	session({
		secret: 'F%*h;Y/zm6-4Wv.<+ObfNFxO&$Q;D',
		resave: true,
		saveUninitialized: true,
	})
)

const booksRouter = require('./routes/book')
const usersRouter = require('./routes/users')

const auth = require('./middleware/auth')
//app.use(auth)

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

//define routers
app.use('/', usersRouter)
app.use('/books', auth, booksRouter)

module.exports = app
