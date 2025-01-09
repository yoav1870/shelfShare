const Book = require("../models/bookModel");
const { fetchBookDataById } = require("../services/googleBooksService");

const booksController = {
  async getAllBooks(req, res) {
    try {
      const books = await Book.find({});
      res.status(200).json(books);
    } catch (err) {
      console.error("Error fetching books:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async addBook(req, res) {
    try {
      const { title, author, genre, status, metadata } = req.body;

      if (!title) {
        return res.status(400).json({ error: "Please provide title" });
      }

      const fetchedBookData = await fetchBookDataById(title);

      if (!fetchedBookData) {
        return res
          .status(404)
          .json({ error: "Book details could not be retrieved" });
      }

      const book = new Book({
        title: fetchedBookData.title,
        author: author || fetchedBookData.authors,
        genre: genre || fetchedBookData.categories || "Unknown",
        donor_refId: req.user.id,
        status: status || "Available",
        metadata: metadata || {
          description: fetchedBookData.description,
          publisher: fetchedBookData.publisher,
          publishedDate: fetchedBookData.publishedDate,
          pageCount: fetchedBookData.pageCount,
          thumbnail: fetchedBookData.thumbnail,
        },
      });

      await book.save();
      res.status(201).json(book);
    } catch (err) {
      res.status(500).json({ error: "Internal server error" + err });
    }
  },

  async searchBookByTitle(req, res) {
    try {
      const { title } = req.params;
      if (!title) {
        return res.status(400).json({ error: "Please provide title" });
      }
      const books = await Book.find({ $text: { $search: title } });
      if (books.length === 0) {
        return res.status(404).json({ error: "No books found" });
      }

      res.status(200).json(books);
    } catch (err) {
      console.error("Error searching book by title:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = { booksController };
