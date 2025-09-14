// File: /api/news.js

export default async function handler(req, res) {
  // Get category and page from the query string (e.g., /api/news?category=sports&page=1)
  const { category, page } = req.query;
  const apiKey = process.env.NEWS_API_KEY; // Using the backend environment variable

  if (!apiKey) {
    return res
      .status(500)
      .json({ status: "error", message: "API key is missing on the server" });
  }

  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=12`;

  try {
    const newsResponse = await fetch(url);

    // Forward the status and data from NewsAPI to the client
    const newsData = await newsResponse.json();
    res.status(newsResponse.status).json(newsData);
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "Failed to fetch data from NewsAPI" });
  }
}
