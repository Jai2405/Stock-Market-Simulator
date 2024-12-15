import React from 'react';
import { Box, Typography } from '@mui/material';

const metrics = [
  { title: 'Total Portfolio Value', value: '$12,345', change: '+2.5%', changeType: 'positive' },
  { title: 'Total Investment', value: '$10,000' },
  { title: 'Profit/Loss', value: '+$2,345', changeType: 'positive' },
];

export default function PortfolioSummary() {
  return (
    <Box
      sx={{
        p: 3,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '5rem', // Spacing between cards
      }}
    >
      {metrics.map((metric, index) => (
        <Box
          key={index}
          sx={{
            p: 2,
            minWidth: 200,
            textAlign: 'center',
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: '#f9f9f9',
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'translateY(-10px)'
            },
          }}
        >
          <Typography variant="subtitle1" gutterBottom>
            {metric.title}
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            {metric.value}
          </Typography>
          {metric.change && (
            <Typography
              variant="body2"
              sx={{
                color: metric.changeType === 'positive' ? 'green' : 'red',
              }}
            >
              {metric.change}
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  );
};

