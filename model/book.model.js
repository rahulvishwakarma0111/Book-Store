const { pgTable, uuid, varchar, text } = require('drizzle-orm/pg-core');
const { authorsTable } = require('./author.model');

const booksTable = pgTable('books', {
  id: uuid('id').primaryKey().defaultRandom(),

  title: varchar('title', { length: 255 }).notNull(),

  description: text('description'),

  authorId: uuid('author_id')
    .references(() => authorsTable.id)
    .notNull(),
});

module.exports = {
  booksTable,
};