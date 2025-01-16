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

const generateNBooks = async (amount, userId) => {
  const MAX_BOOKS_AMOUNT = 10;
  const booksAmount = amount > 0 ? Math.min(amount, 40) : MAX_BOOKS_AMOUNT;
  const query = encodeURIComponent("bestsellers");

  if (!process.env.BOOKS_API_KEY) {
    console.error(
      "API key is missing. Please set BOOKS_API_KEY in your environment variables."
    );
    throw new Error("API key is missing");
  }

  const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&orderBy=relevance&maxResults=${booksAmount}&key=${process.env.BOOKS_API_KEY}`;

  try {
    const fetch = (await import("node-fetch")).default;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const books = data.items.map((item) => {
        const bookData = item.volumeInfo;
        return {
          title: bookData.title || "Unknown",
          author: bookData.authors ? bookData.authors.join(", ") : "Unknown",
          genre: bookData.categories
            ? bookData.categories.join(", ")
            : "Uncategorized",
          donor_refId: userId,
          status: "Available",
          state: "new",
          pics: [],
          location: "Not specified",
          metadata: {
            description: bookData.description || "No description available.",
            publisher: bookData.publisher || "Unknown",
            publishedDate: bookData.publishedDate || "Unknown",
            pageCount: bookData.pageCount || 0,
            thumbnail: bookData.imageLinks
              ? bookData.imageLinks.thumbnail
              : null,
          },
        };
      });

      return books;
    } else {
      console.error("No books found for the query.");
      return [];
    }
  } catch (err) {
    console.error("Error in generateNBooks:", err.message);
    throw err;
  }
};

module.exports = { fetchBookDataById, generateNBooks };
