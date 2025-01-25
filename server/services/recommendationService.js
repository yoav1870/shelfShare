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

    const recommendedBooks = await Book.find({
      $and: [
        {
          $or: [
            { genre: { $in: favoriteGenres } },
            { author: { $in: favoriteAuthors } },
          ],
        },
        { donor_refId: { $ne: userId } },
      ],
    }).limit(5);

    if (recommendedBooks.length < 5) {
      const fallbackBooks = await Book.find({
        donor_refId: { $ne: userId },
      }).limit(5 - recommendedBooks.length);

      const allRecommendedBooks = recommendedBooks.concat(fallbackBooks);
      return allRecommendedBooks;
    }

    return recommendedBooks;
  } catch (err) {
    console.error("Error in recommendation service:", err.message);
    throw err;
  }
};

module.exports = { getRecommendations };
