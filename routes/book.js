const express = require('express')
const router = express.Router()
const books = require('../controllers/book.controller')

// Create a new Customer
router.post('/books', books.create)

// Retrieve all Customers
router.get('/books', books.findAll)

// Retrieve a single Customer with customerId
router.get('/books/:customerId', books.findOne)

// Update a Customer with customerId
router.put('/books/:customerId', books.update)

// Delete a Customer with customerId
router.delete('/books/:customerId', books.delete)

// Create a new Customer
router.delete('/books', books.deleteAll)

module.exports = router
