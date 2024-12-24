import { useState, useEffect } from 'react';
import axios from 'axios';

export default function usePortfolioData() {
  const [portfolio, setPortfolio] = useState([]);
  const [portfolioWithPrices, setPortfolioWithPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKeyFMP1 = 'qVMbGCVEwhc1WF9wuttj8nYrCgOsLST6';
  const apiKeyFMP2 = 'Y52DRqukXpCtsfjrkQ8YJSbJ1iN96DIq';

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        // Fetch the portfolio data
        const response = await axios.get('http://localhost:3000/portfolio'); // Replace with your API endpoint
        const portfolioData = response.data;
  
        // Fetch current price for each stock and calculate changes_percentage
        const updatedPortfolio = await Promise.all(
          portfolioData.map(async (stock) => {
            try {
              const priceResponse = await axios.get(
                `https://financialmodelingprep.com/api/v3/quote/${stock.stock}?apikey=${apiKeyFMP1}` // Replace with your stock price API endpoint
              );
              const priceData = priceResponse.data[0]; // Access the first object in the array
              const currentPrice = priceData.price;
  
              // Calculate percentage change
              const changesPercentage = (
                ((currentPrice - stock.buy_price) / stock.buy_price) *
                100
              ).toFixed(2); // Keep two decimal places
  
              // Return the stock data with the current price and calculated fields added
              return {
                ...stock,
                current_price: currentPrice,
                changes_percentage: parseFloat(changesPercentage), // Parse to number
                change: currentPrice - stock.buy_price, // Absolute change
              };
            } catch (err) {
              console.error(`Error fetching price for ${stock.stock}:`, err);
              return { ...stock, current_price: null, changes_percentage: null, change: null }; // Fallback in case of error
            }
          })
        );
  
        setPortfolio(portfolioData);
        setPortfolioWithPrices(updatedPortfolio);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching portfolio data:', err);
        setError(err);
        setLoading(false);
      }
    };
  
    fetchPortfolioData();
  }, []);


  let demoPortfolio = [];
  let demoWorstPerformingStocks = [];
  let demoBestPerformingStocks = [];
  let demoInvestmentValue = 0;
  let demoPortfolioValue = 0;
  let demoProfitLoss = 0;
  let demoLoading = true;
  let demoError = false;

  demoPortfolio = [
    {
      portfolio_id: 5,
      user_id: 15,
      stock: 'TSLA',
      quantity: 1,
      buy_price: 279.3,
      date: '2024-11-25',
      current_price: 200,
      change_percent: 12
    },
    {
      portfolio_id: 6,
      user_id: 15,
      stock: 'AMZN',
      quantity: 4,
      buy_price: 279.3,
      date: '2024-11-25',
      current_price: 200,
      change_percent: 12
    },
    {
      portfolio_id: 8,
      user_id: 15,
      stock: 'GOOGL',
      quantity: 1,
      buy_price: 279.3,
      date: '2024-11-25',
      current_price: 200,
      change_percent: 12
    },
    {
      portfolio_id: 9,
      user_id: 15,
      stock: 'AAPL',
      quantity: 7,
      buy_price: 279.3,
      date: '2024-11-26',
      current_price: 200,
      change_percent: 12
    },
    {
      portfolio_id: 11,
      user_id: 16,
      stock: 'AAPL',
      quantity: 10,
      buy_price: 279.3,
      date: '2024-11-26',
      current_price: 200,
      change_percent: 12
    },
    {
      portfolio_id: 13,
      user_id: 15,
      stock: 'MSFT',
      quantity: 6,
      buy_price: 279.3,
      date: '2024-11-26',
      current_price: 200,
      change_percent: 12
    }
  ];

  for (const stock of demoPortfolio) {
    demoInvestmentValue += stock.buy_price * stock.quantity;
    demoPortfolioValue += stock.current_price * stock.quantity;
  }
  demoBestPerformingStocks = [{stock: 'AAPL', change_percentage: 4.5}, {stock: 'AAPL', change_percentage: 4.5}, {stock: 'AAPL', change_percentage: 4.5}]
  demoWorstPerformingStocks = [{stock: 'AAPL', change_percentage: 4.5}, {stock: 'AAPL', change_percentage: 4.5}, {stock: 'AAPL', change_percentage: 4.5}]

  console.log("DEMO ", demoPortfolio);
  console.log("REAL ", portfolio);

  return {
    portfolio: demoPortfolio,
    investmentValue: demoInvestmentValue,
    portfolioValue: demoPortfolioValue,
    profitLoss: demoPortfolioValue - demoInvestmentValue,
    bestPerformingStocks: demoBestPerformingStocks,
    worstPerformingStocks: demoWorstPerformingStocks,
    error: demoError,
    loading: demoLoading
  };
}
