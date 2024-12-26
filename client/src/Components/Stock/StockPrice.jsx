import React from 'react';
import { 
  Box, 
  Typography, 
  Chip,
  Button,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import '../../pages/Stock.css';

export default function StockPrice(props) {
    return (
        <>
        <div className='stock-price'>
        <Typography 
          variant="h3" 
          fontWeight="bold" 

        >
          ${props.currentPrice.toFixed(2)}
        </Typography>
        <Typography 
          variant="body1" 
          color={props.isPositive ? 'success.main' : 'error.main'}
        >
          {props.change.toFixed(2)} ({props.changePercent.toFixed(2)}%) 
          {props.isPositive ? '▲' : '▼'}
        </Typography>
      </div>
      </>
    );
}