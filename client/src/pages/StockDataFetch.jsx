import axios from "axios";

export default async function StockDataFetch(stockSymbol) {
  const apiKeyFMP = 'Y52DRqukXpCtsfjrkQ8YJSbJ1iN96DIq';
  console.log(stockSymbol);

  try {
    const response = await axios.get(`https://financialmodelingprep.com/api/v3/quote/${stockSymbol}?apikey=${apiKeyFMP}`);

    const result = response.data;
    if (!result || result.length === 0) {
      console.warn("API returned no data");
      return {};
    }

    const stockData = {
      symbol: result[0].symbol || 'NA',
      name: result[0].name || 'NA',
      currentPrice: result[0].price || 0,
      change: result[0].change || 0,
      changePercent: result[0].changesPercentage || 0,
      yearHigh: result[0].yearHigh || 0,
      yearLow: result[0].yearLow || 0,
      volume: result[0].volume || 0,
      marketCap: result[0].marketCap || 0,
    };

    return stockData;
  } catch (error) {
    console.error("Error fetching stock data points: ", error);
    return {};
  }
}
