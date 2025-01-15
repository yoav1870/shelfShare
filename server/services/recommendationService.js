const User = require("../models/userModel");
const Book = require("../models/bookModel");

const getRecommendations = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const { favoriteGenres, favoriteAuthors } = user.preferences;

    if (!favoriteGenres?.length && !favoriteAuthors?.length) {
      throw new Error("No preferences found. Please update your preferences.");
    }

    const recommendedBooks = await Book.find({
      $or: [
        { genre: { $in: favoriteGenres || [] } },
        { author: { $in: favoriteAuthors || [] } },
      ],
    }).select("title genre author");

    return recommendedBooks;
  } catch (err) {
    console.error("Error in recommendation service:", err);
    throw err;
  }
};
