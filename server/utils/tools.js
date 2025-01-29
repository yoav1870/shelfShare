const fs = require("fs");
const path = require("path");

const getRandomDate = (start, end) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

const badWordsPath = path.join(__dirname, "badWords.json");
const { badWords } = JSON.parse(fs.readFileSync(badWordsPath, "utf-8"));

const containsBadWords = (text) => {
  if (!text || typeof text !== "string") return false;

  const lowerText = text.toLowerCase();
  return badWords.some((word) => lowerText.includes(word));
};

const formatBookData = (book, extraFields = {}) => ({
  _id: book._id,
  title: book.title,
  author: book.author,
  genre: book.genre,
  status: book.status,
  state: book.state,
  donor_refId: book.donor_refId,
  location: book.location,
  metadata: {
    description: book.metadata?.description || "No description available.",
    publisher: book.metadata?.publisher || "Unknown",
    publishedDate: book.metadata?.publishedDate || "Unknown",
    pageCount: book.metadata?.pageCount || 0,
    thumbnail: book.metadata?.thumbnail || "/placeholder.png",
  },
  pics: book.pics || [],
  averageRating: book.averageRating || 0,
  ...extraFields,
});

module.exports = {
  getRandomDate,
  containsBadWords,
  formatBookData,
};
