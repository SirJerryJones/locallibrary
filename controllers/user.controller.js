const Book = require('../models/book.model')

// Create and Save a new Book
exports.create = (req, res) => {
	// Validate request
	if (!req.body) {
		res.status(400).send({
			message: 'Content can not be empty!',
		})
	}

	// Create a Book
	const book = new Book({
		email: req.body.email,
		name: req.body.name,
		active: req.body.active,
	})

	// Save Book in the database
	Book.create(book, (err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || 'Some error occurred while creating the Book.',
			})
		else res.send(data)
	})
}

// Find a single Book with a bookId
exports.findOne = (req, res) => {
	Book.findById(req.params.bookId, (err, data) => {
		if (err) {
			if (err.kind === 'not_found') {
				res.status(404).send({
					message: `Not found Book with id ${req.params.bookId}.`,
				})
			} else {
				res.status(500).send({
					message: 'Error retrieving Book with id ' + req.params.bookId,
				})
			}
		} else res.send(data)
	})
}
