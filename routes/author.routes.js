const express = require('express');
const router = express.Router();
const controller = require('../controllers/author.controller');

router.get('/', controller.getAllAuthors);
router.get('/:id', controller.getAuthorById);
router.post('/', controller.addAuthor);
router.delete('/:id', controller.deleteAuthorById);
router.get('/:id/books', controller.getAuthorsWithBooks);

module.exports = router;