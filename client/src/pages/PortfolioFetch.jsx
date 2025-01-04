// import { useState, useEffect } from 'react';
// import axios from 'axios';

// export default function usePortfolioData() {
//   const [portfolio, setPortfolio] = useState([]);
//   const [portfolioWithPrices, setPortfolioWithPrices] = useState([]);
//   const [investmentValue, setInvestmentValue] = useState(0);
//   const [portfolioValue, setPortfolioValue] = useState(0);
//   const [profitLoss, setProfitLoss] = useState(0);
//   const[bestPerformingStocks, setBestPerformingStocks] = useState([]);
//   const[worstPerformingStocks, setWorstPerformingStocks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const apiKeyFMP1 = 'qVMbGCVEwhc1WF9wuttj8nYrCgOsLST6';
//   const apiKeyFMP2 = 'Y52DRqukXpCtsfjrkQ8YJSbJ1iN96DIq';
//   const apiKeyFMP3 = 'Lqjvy5s6JR1OUaav2V9YK0QSXTTTUwBx';

//   useEffect(() => {
//     const fetchPortfolioData = async () => {
//       let tempInvestmentValue = 0;
//       let tempPortfolioValue = 0;
//       try {
//         // Fetch the portfolio data
//         const response = await axios.get('http://localhost:3000/portfolio'); // Replace with your API endpoint
//         const portfolioData = response.data;
  
//         // Fetch current price for each stock and calculate changes_percentage
//         const updatedPortfolio = await Promise.all(
//           portfolioData.map(async (stock) => {
//             try {
//               const priceResponse = await axios.get(
//                 `https://financialmodelingprep.com/api/v3/quote/${stock.stock}?apikey=${apiKeyFMP1}` // Replace with your stock price API endpoint
//               );
//               const priceData = priceResponse.data[0]; // Access the first object in the array
//               const currentPrice = priceData.price;

//               tempPortfolioValue += currentPrice * stock.quantity;
//               tempInvestmentValue += stock.buy_price * stock.quantity;
  
//               // Calculate percentage change
//               const changesPercentage = (
//                 ((currentPrice - stock.buy_price) / stock.buy_price) *
//                 100
//               ).toFixed(2); // Keep two decimal places
  
//               // Return the stock data with the current price and calculated fields added
//               return {
//                 ...stock,
//                 current_price: currentPrice,
//                 changes_percentage: parseFloat(changesPercentage), // Parse to number
//                 change: currentPrice - stock.buy_price, // Absolute change
//               };
//             } catch (err) {
//               console.error(`Error fetching price for ${stock.stock}:`, err);
//               return { ...stock, current_price: null, changes_percentage: null, change: null }; // Fallback in case of error
//             }
//           })
//         );

//         setInvestmentValue(tempInvestmentValue.toFixed(2));
//         setPortfolioValue(tempPortfolioValue.toFixed(2));
//         setProfitLoss((tempPortfolioValue - tempInvestmentValue).toFixed(2));
//         setPortfolio(portfolioData);
//         setPortfolioWithPrices(updatedPortfolio);
//         setLoading(false);

//       // Compute Best and Worst Performing Stocks
//       const sortedByPerformance = updatedPortfolio
//         .filter(stock => stock.changes_percentage !== null)
//         .sort((a, b) => b.changes_percentage - a.changes_percentage);

//       const tempBestPerformingStocks2 = sortedByPerformance.slice(0, 3).map((stock) => ({
//         stock: stock.stock,
//         change_percentage: stock.changes_percentage,
//       }));

//       const tempWorstPerformingStocks2 = sortedByPerformance.slice(-3).map((stock) => ({
//         stock: stock.stock,
//         change_percentage: stock.changes_percentage,
//       }));

//       setBestPerformingStocks(tempBestPerformingStocks2);
//       setWorstPerformingStocks(tempWorstPerformingStocks2);

//       } catch (err) {
//         console.error('Error fetching portfolio data:', err);
//         setError(err);
//         setLoading(false);
//       }
//     };


    
  


  
//     fetchPortfolioData();
//   }, []);


//   let demoPortfolio = [];
//   let demoWorstPerformingStocks = [];
//   let demoBestPerformingStocks = [];
//   let demoInvestmentValue = 0;
//   let demoPortfolioValue = 0;
//   let demoProfitLoss = 0;
//   let demoLoading = false;
//   let demoError = false;

//   demoPortfolio = [
//     {
//       portfolio_id: 5,
//       user_id: 15,
//       stock: 'TSLA',
//       quantity: 1,
//       buy_price: 279.3,
//       date: '2024-11-25',
//       current_price: 200,
//       change_percent: 12
//     },
//     {
//       portfolio_id: 6,
//       user_id: 15,
//       stock: 'AMZN',
//       quantity: 4,
//       buy_price: 279.3,
//       date: '2024-11-25',
//       current_price: 200,
//       change_percent: 12
//     },
//     {
//       portfolio_id: 8,
//       user_id: 15,
//       stock: 'GOOGL',
//       quantity: 1,
//       buy_price: 279.3,
//       date: '2024-11-25',
//       current_price: 200,
//       change_percent: 12
//     },
//     {
//       portfolio_id: 9,
//       user_id: 15,
//       stock: 'AAPL',
//       quantity: 7,
//       buy_price: 279.3,
//       date: '2024-11-26',
//       current_price: 200,
//       change_percent: 12
//     },
//     {
//       portfolio_id: 11,
//       user_id: 16,
//       stock: 'AAPL',
//       quantity: 10,
//       buy_price: 279.3,
//       date: '2024-11-26',
//       current_price: 200,
//       change_percent: 12
//     },
//     {
//       portfolio_id: 13,
//       user_id: 15,
//       stock: 'MSFT',
//       quantity: 6,
//       buy_price: 279.3,
//       date: '2024-11-26',
//       current_price: 200,
//       change_percent: 12
//     }
//   ];


//   demoBestPerformingStocks = [{stock: 'AAPL', change_percentage: 4.5}, {stock: 'AAPL', change_percentage: 4.5}, {stock: 'AAPL', change_percentage: 4.5}]
//   demoWorstPerformingStocks = [{stock: 'AAPL', change_percentage: 4.5}, {stock: 'AAPL', change_percentage: 4.5}, {stock: 'AAPL', change_percentage: 4.5}]




//   return {
//     portfolio: portfolioWithPrices,
//     investmentValue: investmentValue,
//     portfolioValue: portfolioValue,
//     profitLoss: profitLoss,
//     bestPerformingStocks: bestPerformingStocks,
//     worstPerformingStocks: worstPerformingStocks,
//     error: demoError,
//     loading: demoLoading
//   };
// }

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function usePortfolioData() {
  const [portfolio, setPortfolio] = useState([]);
  const [portfolioWithPrices, setPortfolioWithPrices] = useState([]);
  const [investmentValue, setInvestmentValue] = useState(0);
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [profitLoss, setProfitLoss] = useState(0);
  const [bestPerformingStocks, setBestPerformingStocks] = useState([]);
  const [worstPerformingStocks, setWorstPerformingStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const apiKeyFMP = 'Y52DRqukXpCtsfjrkQ8YJSbJ1iN96DIq';

  useEffect(() => {
    const fetchPortfolioData = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setLoading(false);
        return;
      }

      let tempInvestmentValue = 0;
      let tempPortfolioValue = 0;
      try {
        const response = await axios.get(`http://localhost:3000/portfolio/${userId}`);
        const portfolioData = response.data;

        const updatedPortfolio = await Promise.all(
          portfolioData.map(async (stock) => {
            try {
              const priceResponse = await axios.get(
                `https://financialmodelingprep.com/api/v3/quote/${stock.stock}?apikey=${apiKeyFMP}`
              );
              const priceData = priceResponse.data[0];
              const currentPrice = priceData.price;

              tempPortfolioValue += currentPrice * stock.quantity;
              tempInvestmentValue += stock.buy_price * stock.quantity;

              const changesPercentage = (
                ((currentPrice - stock.buy_price) / stock.buy_price) *
                100
              ).toFixed(2);

              return {
                ...stock,
                current_price: currentPrice,
                changes_percentage: parseFloat(changesPercentage),
                change: currentPrice - stock.buy_price,
              };
            } catch (err) {
              console.error(`Error fetching price for ${stock.stock}:`, err);
              return {
                ...stock,
                current_price: null,
                changes_percentage: null,
                change: null
              };
            }
          })
        );

        setInvestmentValue(tempInvestmentValue.toFixed(2));
        setPortfolioValue(tempPortfolioValue.toFixed(2));
        setProfitLoss((tempPortfolioValue - tempInvestmentValue).toFixed(2));
        setPortfolio(portfolioData);
        setPortfolioWithPrices(updatedPortfolio);

        const sortedByPerformance = updatedPortfolio
          .filter(stock => stock.changes_percentage !== null)
          .sort((a, b) => b.changes_percentage - a.changes_percentage);

        const bestStocks = sortedByPerformance.slice(0, 3).map(stock => ({
          stock: stock.stock,
          change_percentage: stock.changes_percentage,
        }));

        const worstStocks = sortedByPerformance.slice(-3).map(stock => ({
          stock: stock.stock,
          change_percentage: stock.changes_percentage,
        }));

        setBestPerformingStocks(bestStocks);
        setWorstPerformingStocks(worstStocks);
        setLoading(false);

      } catch (err) {
        console.error('Error fetching portfolio data:', err);
        setError(err);
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);

  return {
    portfolio: portfolioWithPrices,
    investmentValue,
    portfolioValue,
    profitLoss,
    bestPerformingStocks,
    worstPerformingStocks,
    error,
    loading
  };
}
