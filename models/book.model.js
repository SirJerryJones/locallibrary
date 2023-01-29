const sql = require('../database/dbconn')

// constructor
const Book = function (book) {
	this.email = book.email
	this.name = book.name
	this.active = book.active
}

Book.create = (newBook, result) => {
	sql.query('INSERT INTO books SET ?', newBook, (err, res) => {
		if (err) {
			console.log('error: ', err)
			result(err, null)
			return
		}

		console.log('created book: ', { id: res.insertId, ...newBook })
		result(null, { id: res.insertId, ...newBook })
	})
}

Book.findById = (bookId, result) => {
	sql.query(`SELECT * FROM books WHERE id = ${bookId}`, (err, res) => {
		if (err) {
			console.log('error: ', err)
			result(err, null)
			return
		}

		if (res.length) {
			console.log('found book: ', res[0])
			result(null, res[0])
			return
		}

		// not found Book with the id
		result({ kind: 'not_found' }, null)
	})
}

Book.getAll = (result) => {
	sql.query('SELECT * FROM authors', (err, res) => {
		if (err) {
			console.log('error: ', err)
			result(null, err)
			return
		}

		console.log('books: ', res)
		result(null, res)
	})
}

Book.updateById = (id, book, result) => {
	sql.query(
		'UPDATE books SET email = ?, name = ?, active = ? WHERE id = ?',
		[book.email, book.name, book.active, id],
		(err, res) => {
			if (err) {
				console.log('error: ', err)
				result(null, err)
				return
			}

			if (res.affectedRows == 0) {
				// not found Book with the id
				result({ kind: 'not_found' }, null)
				return
			}

			console.log('updated book: ', { id: id, ...book })
			result(null, { id: id, ...book })
		}
	)
}

Book.remove = (id, result) => {
	sql.query('DELETE FROM books WHERE id = ?', id, (err, res) => {
		if (err) {
			console.log('error: ', err)
			result(null, err)
			return
		}

		if (res.affectedRows == 0) {
			// not found Book with the id
			result({ kind: 'not_found' }, null)
			return
		}

		console.log('deleted book with id: ', id)
		result(null, res)
	})
}

Book.removeAll = (result) => {
	sql.query('DELETE FROM books', (err, res) => {
		if (err) {
			console.log('error: ', err)
			result(null, err)
			return
		}

		console.log(`deleted ${res.affectedRows} books`)
		result(null, res)
	})
}

module.exports = Book
