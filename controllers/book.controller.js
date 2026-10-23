// const { BOOKS } = require('../model/book.model');
const { booksTable } = require('../model/book.model');
const db = require('../db/index');
const { eq, ilike, sql } = require('drizzle-orm');
const { authorsTable } = require('../model/author.model');

exports.getAllBooks = async (req, res) => {
    console.log("Original URL:", req.originalUrl);
    console.log("Query:", req.query);
    console.log("Search:", req.query.search);

    const search = req.query.search;

    console.log("Search:", search);

    if (search) {
        const books = await db
            .select()
            .from(booksTable)
            .where(
                sql`to_tsvector('english', ${booksTable.title}) @@ to_tsquery('english', ${search})`
            )

        return res.json(books);
    }

    const books = await db.select().from(booksTable);
    return res.json(books);
};

exports.getBookById = async (req, res) => {

    const id = req.params.id;

    const [book] = await db.select().from(booksTable).where(eq(booksTable.id, id)).leftJoin(authorsTable, eq(booksTable.authorId, authorsTable.id)).limit(1);

    if (!book) {
        return res.status(404).send('Book not found');
    }

    res.json(book);
};

exports.addBook = async (req, res) => {

    const { title, authorId, description } = req.body;

    if (!title || !authorId) {
        return res.status(400).send('Title and authorId are required');
    }

    const result = await db.insert(booksTable).values({ title, authorId, description }).returning({
        id: booksTable.id,
    });

    return res.status(201).json({ message: 'Book added successfully', id: result.id });

}

exports.deleteBookById = async (req, res) => {

    const id = req.params.id;

    await db.delete(booksTable).where(eq(booksTable.id, id));

    return res.status(200).json({ message: 'Book deleted successfully' });
};

