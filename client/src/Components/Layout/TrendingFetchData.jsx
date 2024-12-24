import axios from "axios";


export default async function useTrendingStocksData() {
    const apiKeyFh = "ctast31r01qgsps7stmgctast31r01qgsps7stn0";
    const stocks = ["META", "NVDA", "AMD", "NFLX", "AAPL"];
    try {
      const responses = await Promise.all(
        stocks.map(symbol =>
          axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKeyFh}`)
        )
      );
      return responses.map((response, index) => {
        const { c: currentPrice, dp: percentChange } = response.data;
        return {
          symbol: stocks[index],
          price: `$${currentPrice.toFixed(2)}`,
          percentChange: `${percentChange > 0 ? "+" : ""}${percentChange.toFixed(1)}%`,
          changeType: percentChange > 0 ? "positive" : "negative",
        };
      });
    } catch (error) {
      console.error("Error fetching trending stocks data:", error);
      return []; // Always return an array
    }
  }
  