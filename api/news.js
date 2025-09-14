// File: /api/news.js

export default async function handler(req, res) {
  // Get category and page from the request URL
  const { category, page } = req.query;
  // Get the API key securely from environment variables
  const apiKey = process.env.NEWS_API_KEY;

  // Handle case where API key is missing on the server
  if (!apiKey) {
    return res.status(500).json({
      status: "error",
      message: "API key is not configured on the server.",
    });
  }

  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=12`;

  try {
    const newsResponse = await fetch(url);
    const newsData = await newsResponse.json();

    // Forward the response (whether success or error) from NewsAPI back to your app
    res.status(newsResponse.status).json(newsData);
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "An internal server error occurred." });
  }
}
