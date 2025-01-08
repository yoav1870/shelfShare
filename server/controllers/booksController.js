const Book = require("../models/bookModel");

const booksController = {
  async getAllBooks(req, res) {
    try {
      const books = await Book.find({});
      res.json(books).status(200);
    } catch (err) {
      res.json({ error: err }).status(500);
    }
  },

  async addBook(req, res) {
    try {
      const { title, author, genre, donor_refId, status, metadata } = req.body;
      if (!title || !author || !genre || !donor_refId || !status || !metadata) {
        res.json({ error: "Please provide all required fields" }).status(400);
        return;
      }
      const book = new Book({
        title,
        author,
        genre,
        donor_refId,
        status,
        metadata,
      });
      await book.save();
      res.json(book).status(201);
    } catch (err) {
      res.json({ error: err }).status(500);
    }
  },
};

module.exports = { booksController };
