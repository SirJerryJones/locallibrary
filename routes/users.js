var express = require('express')
var router = express.Router()
const db = require('../database/dbconn')
const books = require('../controllers/user.controller')

/* GET users listing. */
/* GET home page. */
router.get('/', async function (req, res) {
	if (!req.session.loggedin) {
		let data = ''
		if (req.session.context) {
			data = req.session.context
			req.session.destroy()
		}
		res.render('signin.njk', {
			page_title: 'Local Library App',
			response: data,
		})
	} else {
		res.render('dashboard.njk', {
			page_title: 'Local Library App',
			user: req.session.userdata,
		})
	}
})
router.get('/signin', async function (req, res) {
	res.render('signin.njk', { page_title: 'Local Library App' })
})
router.get('/signup', async function (req, res) {
	res.render('signup.njk', { page_title: 'Local Library App' })
})
// Validate and let user in
router.post('/login', async (req, res) => {
	let username = req.body.username
	let password = req.body.password

	if (username && password) {
		db.query(
			'SELECT id, first_name, last_name FROM users WHERE email = ? AND password = ?',
			[username, password],
			function (error, results, fields) {
				if (error) throw error

				if (results.length > 0) {
					req.session.loggedin = true
					req.session.userdata = results

					res.redirect('/')
				} else {
					req.session.context = {
						error: 'true',
						errClass: 'bg-red-600',
						errMsg: 'ERROR: Incorrect username/password.',
						username: username,
					}
					res.redirect('/')
				}
			}
		)
	} else {
		req.session.context = {
			error: 'true',
			errClass: 'bg-amber-400 text-black',
			errMsg: 'WARNING: Please enter Username and Password!',
			username: username,
		}
		res.redirect('/')
	}
})

// register user in
router.post('/register', async (req, res) => {
	let firstName = req.body.firstName
	let lastName = req.body.lastName || ''
	let username = req.body.username
	let password = req.body.password

	if (username && password && firstName) {
		let userdata = {
			firstName: firstName,
			lastName: lastName,
			username: username,
			password: password,
		}

		db.query(
			'INSERT INTO books SET ?',
			userdata,
			function (error, results, fields) {
				if (error) throw error

				if (results.length > 0) {
					req.session.loggedin = true
					req.session.userdata = results

					res.redirect('/')
				} else {
					req.session.context = {
						error: 'true',
						errClass: 'bg-red-600',
						errMsg: 'ERROR: Incorrect username/password.',
						username: username,
					}
					res.redirect('/')
				}
			}
		)
	} else {
		req.session.context = {
			error: 'true',
			errClass: 'bg-amber-400 text-black',
			errMsg: 'WARNING: Please enter Username and Password!',
			username: username,
		}
		res.redirect('/')
	}
})

module.exports = router
