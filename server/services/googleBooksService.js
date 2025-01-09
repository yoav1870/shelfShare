const Fuse = require("fuse.js");

const fetchBookDataById = async (title) => {
  const query = encodeURIComponent(title);
  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${process.env.BOOKS_API_KEY}`;

  try {
    const fetch = (await import("node-fetch")).default;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const fuse = new Fuse(data.items, {
        keys: ["volumeInfo.title"],
        threshold: 0.4,
      });

      const fuzzyResults = fuse.search(title);
      const bestMatch =
        fuzzyResults.length > 0
          ? fuzzyResults[0].item.volumeInfo
          : data.items[0].volumeInfo;

      return {
        title: bestMatch.title || "Unknown",
        authors: bestMatch.authors ? bestMatch.authors.join(", ") : "Unknown",
        description: bestMatch.description || "No description available.",
        publisher: bestMatch.publisher || "Unknown publisher",
        publishedDate: bestMatch.publishedDate || "Unknown date",
        pageCount: bestMatch.pageCount || "N/A",
        categories: bestMatch.categories
          ? bestMatch.categories.join(", ")
          : "None",
        thumbnail: bestMatch.imageLinks ? bestMatch.imageLinks.thumbnail : null,
      };
    } else {
      console.error("No books found for the provided title.");
      return null;
    }
  } catch (err) {
    console.error("Error in fetchBookDataById:", err);
    throw err;
  }
};

module.exports = { fetchBookDataById };
