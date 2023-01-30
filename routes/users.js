var express = require('express')
var router = express.Router()

/* GET users listing. */
/* GET home page. */
router.get('/', async function (req, res) {
	res.render('signin.njk', { page_title: 'Local Library App' })
})
router.get('/signup', async function (req, res) {
	res.render('signup.njk', { page_title: 'Local Library App' })
})
// Validate and let user in
router.post('/login', async (req, res) => {
	res.render('dashboard.njk')
})
// register user in
router.post('/register', async (req, res) => {
	res.render('dashboard.njk')
})

module.exports = router
