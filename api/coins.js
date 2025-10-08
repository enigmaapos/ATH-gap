export default async function handler(req, res) {
  const { page = 1 } = req.query;
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=${page}&sparkline=false&price_change_percentage=24h`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).json({ error: `CoinGecko error ${response.status}` });
    }
    const data = await response.json();

    // Allow frontend access
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Server fetch failed", details: err.message });
  }
}
