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

module.exports = {
  getRandomDate,
  containsBadWords,
};
