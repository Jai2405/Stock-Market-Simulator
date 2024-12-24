import React from 'react';
import {useState, useEffect} from 'react';
import useTrendingStocksData from './TrendingFetchData';
import { 
  Box, 
  List, 
  ListItem, 
  ListItemText, 
  Typography, 
  Divider, 
  Paper
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

export default function TrendingStocks() {
  const [trendingStocks, setTrendingStocks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await useTrendingStocksData();
      setTrendingStocks(data);
    }
    fetchData();
  }, []);
  

  return (
    <Paper 
      elevation={1} 
      sx={{ 
        bgcolor: 'transparent',
        border: '1px solid', 
        borderColor: 'divider',
        borderRadius:2,
        mt: 2
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          p: 2,
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      >
        <TrendingUpIcon sx={{ mr: 2.5 }} />
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Trending Stocks
        </Typography>
      </Box>
      <List disablePadding>
        {trendingStocks.map((stock, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 'bold',
                        color: 'text.primary',
                      }}
                    >
                      {stock.symbol}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 'bold',
                        color: 'text.secondary',
                      }}
                    >
                      {stock.price}
                    </Typography>
                  </Box>
                }
                secondary={
                  <Typography
                    variant="body2"
                    sx={{
                      color: stock.changeType === 'positive' 
                        ? 'success.main' 
                        : 'error.main',
                      textAlign: 'right'
                    }}
                  >
                    {stock.percentChange}
                  </Typography>
                }
              />
            </ListItem>
            {index < trendingStocks.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
}