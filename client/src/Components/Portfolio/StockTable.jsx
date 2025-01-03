import React, { useState } from 'react';
import Table from '@mui/joy/Table';
import axios from 'axios';

export default function StockTable(props) {
  const [hoveredRow, setHoveredRow] = useState(null);

  const handleExit = async (stockSymbol, quantity, currentPrice) => {
    try {
      const response = await axios.post('http://localhost:3000/sell', {
        symbol: stockSymbol,
        price: currentPrice,
        shares: quantity,
        action: 'sell',
      });
      console.log('Exit Response:', response.data);
  
      // Refresh the page to reflect changes
      window.location.reload();
    } catch (error) {
      console.error('Error exiting position:', error);
    }
  };

  return (
    <Table>
      <thead className="table-header">
        <tr>
          <th scope="col" className="stock-column">Stock</th>
          <th scope="col" className="small-column">Qty.</th>
          <th scope="col" className="medium-column">Buy Price</th>
          <th scope="col" className="medium-column">Cur. Price</th>
          <th scope="col" className="medium-column">P&L</th>
          <th scope="col" className="medium-column">Total Cost</th>
          <th scope="col" className="medium-column">Curr. Value</th>
          <th scope="col" className="small-column">% Δ</th>
          <th scope="col" className="medium-column">Date</th>
          <th scope="col" className="medium-column"></th>
        </tr>
      </thead>
      <tbody>
        {props.portfolio.map((row, index) => (
          
          <tr
            key={index}
            onMouseEnter={() => setHoveredRow(index)}
            onMouseLeave={() => setHoveredRow(null)}
            style={{ backgroundColor: hoveredRow === index ? '#f9f9f9' : 'white' }}
          >
            <td>{row.stock}</td>
            <td>{row.quantity}</td>
            <td>${row.buy_price.toFixed(2)}</td>
            <td>${row.current_price.toFixed(2)}</td>
            <td style={{ color: row.changes_percentage >= 0 ? 'green' : 'red' }}>
              ${((row.current_price - row.buy_price) *  row.quantity).toFixed(2)}
            </td>
            <td>${(row.buy_price * row.quantity).toFixed(2)}</td>
            <td>${(row.current_price * row.quantity).toFixed(2)}</td>
            <td style={{ color: row.changes_percentage >= 0 ? 'green' : 'red' }}>{row.changes_percentage.toFixed(2)}%</td>
            <td>{row.date}</td>
            <td>
              {hoveredRow === index && (
                <button
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#d32f2f',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleExit(row.stock, row.quantity, row.current_price)}
                >
                  Exit
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
