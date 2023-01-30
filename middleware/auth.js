module.exports = function auth(req, res, next) {
	if (!req.session.loggedin) {
		res.redirect('/')
	} else {
		next()
	}
}
