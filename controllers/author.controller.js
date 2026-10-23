const { authorsTable } = require('../model/author.model');
const db = require('../db/index');
const { eq } = require('drizzle-orm');
const { booksTable } = require('../model/book.model');


exports.getAllAuthors = async (req, res) => {
    const authors = await db.select().from(authorsTable);
    return res.json(authors);
}

exports.getAuthorById = async (req, res) => {
    const id = req.params.id;
    const [author] = await db.select().from(authorsTable).where(eq(authorsTable.id, id)).limit(1);
    if (!author) {
        return res.status(404).send('Author not found');
    }
    res.json(author);
}

exports.addAuthor = async (req, res) => {
    const { firstName, lastName, email } = req.body;
    const result = await db.insert(authorsTable).values({ firstName, lastName, email }).returning({
        id: authorsTable.id,
    });
    return res.status(201).json({ message: 'Author added successfully', id: result.id });
}

exports.deleteAuthorById = async (req, res) => {
    const id = req.params.id;
    const [author] = await db.select().from(authorsTable).where(eq(authorsTable.id, id)).limit(1);
    if (!author) {
        return res.status(404).send('Author not found');
    }
    await db.delete(authorsTable).where(eq(authorsTable.id, id));
    return res.json({ message: 'Author deleted successfully' });
}


exports.getAuthorsWithBooks = async (req, res) => {

    const id = req.params.id;
    
    const books = await db.select().from(booksTable).where(eq(booksTable.authorId, req.params.id));

    if (!books || books.length === 0) {
        return res.status(404).send('No books found for this author');
    }

    res.json(books);
}