const User = require("../models/userModel");
const Book = require("../models/bookModel");

const getRecommendations = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      console.error("User not found:", userId);
      throw new Error("User not found");
    }

    const { favoriteGenres = [], favoriteAuthors = [] } = user.preferences;
    const bookSet = new Set();
    const uniqueBooks = [];

    const preferredBooks = await Book.find({
      $and: [
        {
          $or: [
            { genre: { $in: favoriteGenres } },
            { author: { $in: favoriteAuthors } },
          ],
        },
        { donor_refId: { $ne: userId } },
      ],
    });

    for (let book of preferredBooks) {
      if (!bookSet.has(book.title)) {
        bookSet.add(book.title);
        uniqueBooks.push(book);
      }
      if (uniqueBooks.length >= 7) break;
    }

    if (uniqueBooks.length < 7) {
      const fallbackBooks = await Book.find({ donor_refId: { $ne: userId } });

      for (let book of fallbackBooks) {
        if (!bookSet.has(book.title)) {
          bookSet.add(book.title);
          uniqueBooks.push(book);
        }
        if (uniqueBooks.length >= 7) break;
      }
    }

    return uniqueBooks;
  } catch (err) {
    console.error("Error in recommendation service:", err.message);
    throw err;
  }
};

module.exports = { getRecommendations };
