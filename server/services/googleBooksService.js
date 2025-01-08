const fetchBookDataById = async (title) => {
  const query = `intitle:${encodeURIComponent(title)}`;
  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${process.env.BOOKS_API_KEY}`;
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();
    if (data.items && data.items.length > 0) {
      const bookData = data.items[0].volumeInfo;

      return {
        title: bookData.title || title,
        authors: bookData.authors ? bookData.authors.join(", ") : "Unknown",
        description: bookData.description || "No description available.",
        publisher: bookData.publisher || "Unknown publisher",
        publishedDate: bookData.publishedDate || "Unknown date",
        pageCount: bookData.pageCount || "N/A",
        categories: bookData.categories
          ? bookData.categories.join(", ")
          : "None",
        thumbnail: bookData.imageLinks ? bookData.imageLinks.thumbnail : null,
      };
    } else {
      return null;
    }
  } catch (err) {
    throw err;
  }
};

module.exports = { fetchBookDataById };
