import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import '../../pages/Home.css';

export default function PortfolioSummary(props) {
  const metrics = [
    { 
      title: 'Total Portfolio Value', 
      value: props.portfolioValue, 
      change: (((props.portfolioValue - props.investmentValue) / props.investmentValue) * 100).toFixed(1), 
      changeType: (((props.portfolioValue - props.investmentValue) / props.investmentValue) * 100).toFixed(1) >= 0 ? 'positive': 'negative' 
    },
    { 
      title: 'Total Investment', 
      value: props.investmentValue 
    },
    { 
      title: 'Profit/Loss', 
      value: props.profitLoss, 
      changeType: 'positive' 
    },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        gap: '2rem',
        flexWrap: 'wrap',
        paddingBottom : '1.5rem',
        '& > :not(style)': {
          m: 1,
          width: '15rem',
          height: '7rem',
        },
      }}
    >
      {metrics.map((metric, index) => (
        <Paper 
          key={index} 
          elevation={3} 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'translateY(-10px)'
            },
            p: 2
          }}
        >
          <Typography variant="h6" color="textSecondary" gutterBottom>
            {metric.title} 
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            ${metric.value}
          </Typography>
          {metric.change && (
            <Typography
              variant="body2"
              sx={{
                color: metric.changeType === 'positive' ? 'green' : 'red',
              }}
            >
              {metric.change > 0 ? '+' : '-'}{metric.change}%
            </Typography>
          )}
        </Paper>
      ))}
    </Box>
  );
}