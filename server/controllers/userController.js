const User = require("../models/userModel");
const Book = require("../models/bookModel");

const userController = {
  async requestBook(req, res) {
    try {
      const { bookId } = req.body;
      const requesterId = req.user.id;
      if (!bookId) {
        return res.status(400).json({ error: "Book ID is required" });
      }
      const book = await Book.findById(bookId).populate("donor_refId");
      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }

      const donorId = book.donor_refId;
      if (!donorId) {
        return res
          .status(400)
          .json({ error: "Book does not have an associated donor" });
      }

      const requester = await User.findById(requesterId);
      if (!requester) {
        return res.status(404).json({ error: "Requester not found" });
      }

      const donor = await User.findById(donorId);
      if (!donor) {
        return res.status(404).json({ error: "Donor not found" });
      }

      book.status = "Reserved";
      await book.save();

      requester.request_history.push({ book: bookId, requestedAt: Date.now() });
      await requester.save();

      donor.donation_history.push({ book: bookId, donatedAt: Date.now() });
      await donor.save();

      res.status(200).json({
        message: "Book successfully added to request and donation histories",
        requester,
        donor,
        bookStatus: book.status,
      });
    } catch (err) {
      res.status(500).json({ error: "Internal server error" + err });
    }
  },

  async getBooksDonatedByUser(req, res) {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).populate({
        path: "donation_history.book",
        select: "title genre",
      });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const donatedBooks = user.donation_history.map((donation) => ({
        title: donation.book?.title || "Unknown",
        genre: donation.book?.genre || "Unknown",
        date: donation.donatedAt,
      }));
      res.status(200).json(donatedBooks);
    } catch (err) {
      res.status(500).json({ error: "Internal server error" + err });
    }
  },

  async getBooksRequestedByUser(req, res) {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).populate({
        path: "request_history.book",
        select: "title genre",
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const requestedBooks = user.request_history.map((request) => ({
        title: request.book?.title || "Unknown",
        genre: request.book?.genre || "Unknown",
        date: request.requestedAt,
      }));
      res.status(200).json(requestedBooks);
    } catch (err) {
      res.status(500).json({ error: "Internal server error" + err });
    }
  },
};

module.exports = { userController };
