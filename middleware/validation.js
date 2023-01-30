const { check } = require('express-validator')

const validate = () => {
	return [
		check('username')
			.trim()
			.not()
			.isEmpty()
			.withMessage('Please enter username.')
			.isEmail('username must be a valid email.'),
		check('password')
			.trim()
			.isEmpty()
			.withMessage('Please enter password.')
			.isLength({ min: 6 })
			.isString()
			.withMessage('Please enter a valid password'),
	]
}

module.exports = { validate }
