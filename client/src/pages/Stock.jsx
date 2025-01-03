import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import StockDataFetch from './StockDataFetch';
import { 
  Box, 
  Typography, 
  Chip 
} from '@mui/material';
import Graph from '../Components/Stock/Graph';
import StockPrice from '../Components/Stock/StockPrice';
import OtherDetails from '../Components/Stock/OtherDetails';
import StockTradeButtons from '../Components/Stock/Buttons';
import './Stock.css';

export default function Stock() {
  const [stockData, setStockData] = useState(null); // Start with null for loading state
  const { symbol } = useParams(); // Capture the dynamic segment

  // Fetch stock data on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await StockDataFetch(symbol);

        setStockData(data);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    }
    fetchData();
  }, []);

  // Show loading state if data is not yet loaded
  if (!stockData) {
    return <div>Loading...</div>;
  }

  // Destructure stockData with fallback values
  const {
    stockSymbol = 'N/A',
    name = 'N/A',
    currentPrice = 0,
    change = 0,
    changePercent = 0,
    high = 0,
    low = 0,
    volume = 0,
    marketCap = 0,
  } = stockData;

    const handleBuy = async (shares) => {
    try {
      const response = await axios.post('http://localhost:3000/buy', {
        symbol: stockData.symbol,
        price: stockData.currentPrice,
        shares,
        action: 'buy',
      });
      console.log('Buy Response:', response.data);
      const shareText = shares == 1? ' share' : ' shares';
      const message = "Bought " + shares + shareText + " of " + stockData.symbol + " at $" + stockData.currentPrice;
      alert(message);
    } catch (error) {
      console.error('Error buying shares:', error);
    }
  };

  const handleSell = async (shares) => {
    try {
      const response = await axios.post('http://localhost:3000/sell', {
        symbol: stockData.symbol,
        price: stockData.currentPrice,
        shares,
        action: 'sell',
      });
      console.log('Sell Response:', response.data);
      const shareText = shares == 1? ' share' : ' shares';
      const message = "Sold " + shares + shareText + " of " + stockData.symbol + " at $" + stockData.currentPrice;
      alert(message);
    } catch (error) {
      console.error('Error selling shares:', error);
    }
  };
  const isPositive = change >= 0;

  return (
    <div className="stock-container">
      <div className="header">
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          p: 2 
        }}>
          <Box>
            <Typography variant="h4" fontWeight="bold" color="primary">
              {name}
            </Typography>
            <Chip 
              label={symbol} 
              color="primary" 
              size="small" 
              sx={{ mt: 1 }}
            />
          </Box>
          <div className="buttons">
            <StockTradeButtons 
              stockPrice={stockData.currentPrice}
              stockSymbol={stockData.symbol}
              onBuy={handleBuy}
              onSell={handleSell}/>
          </div>
        </Box>
      </div>

      <div className="non-header">
        <div className="graph">
          <Box sx={{ height: '100%', p: 2 }}>
            <Typography 
              variant="h6" 
              textAlign="center"
              mb={2} 
              color="text.secondary"
            >
              Stock Performance
            </Typography>
            <Graph />
          </Box>
        </div>

        <div className="stock-details">
          <div className="stock-price">
            <StockPrice
              isPositive={isPositive}
              change={stockData.change}
              changePercent={stockData.changePercent}
              currentPrice={stockData.currentPrice}
            />
          </div>
          <div className="other-details">
            <OtherDetails
              marketCap={stockData.marketCap}
              high={stockData.yearHigh}
              low={stockData.yearLow}
              volume={stockData.volume}
            />
          </div>
        </div>
      </div>
    </div>
  );
}



