import React from 'react';
import { List, ListItem, ListItemText, Typography, Divider } from '@mui/material';

const trendingStocks = [
  { symbol: 'META', change: '+3.8%', changeType: 'positive', price: '$340.25' },
  { symbol: 'NVDA', change: '-2.1%', changeType: 'negative', price: '$490.15' },
  { symbol: 'AMD', change: '+1.5%', changeType: 'positive', price: '$105.60' },
  { symbol: 'NFLX', change: '-0.5%', changeType: 'negative', price: '$420.70' },
];

export default function TrendingStocks() {
  return (
    <div style={{ marginTop: '4rem' , paddingTop: '1rem'}}>
      <Typography
        variant="h6"
        align="center"
        style={{ marginBottom: '1rem', fontWeight: 'bold' }}
      >
        Trending Stocks
      </Typography>
      <List>
        {trendingStocks.map((stock, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    style={{
                      fontWeight: 'bold',
                      color: '#333',
                    }}
                  >
                    {stock.symbol} - {stock.price}
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="body2"
                    style={{
                      color: stock.changeType === 'positive' ? 'green' : 'red',
                    }}
                  >
                    {stock.change}
                  </Typography>
                }
              />
            </ListItem>
            {index < trendingStocks.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}
