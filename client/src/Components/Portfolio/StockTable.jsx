import React, { useState } from 'react';
import Table from '@mui/joy/Table';

export default function StockTable(props) {
  const [hoveredRow, setHoveredRow] = useState(null);

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
        {props.portfolio.map((row, index) => {
          // Handle undefined or null values safely
          const buyPrice = row.buy_price ?? 0;
          const currentPrice = row.current_price ?? 0;
          const changePercent = row.change_percent ?? 0;

          return (
            <tr
              key={index}
              onMouseEnter={() => setHoveredRow(index)}
              onMouseLeave={() => setHoveredRow(null)}
              style={{ backgroundColor: hoveredRow === index ? '#f9f9f9' : 'white' }}
            >
              <td>{row.stock}</td>
              <td>{row.quantity}</td>
              <td>${buyPrice.toFixed(2)}</td>
              <td>${currentPrice.toFixed(2)}</td>
              <td style={{ color: (currentPrice - buyPrice) >= 0 ? 'green' : 'red' }}>
                ${(currentPrice - buyPrice) * row.quantity >= 0
                  ? ((currentPrice - buyPrice) * row.quantity).toFixed(2)
                  : 'N/A'}
              </td>
              <td>${(buyPrice * row.quantity).toFixed(2)}</td>
              <td>${(currentPrice * row.quantity).toFixed(2)}</td>
              <td style={{ color: changePercent >= 0 ? 'green' : 'red' }}>
                {changePercent.toFixed(2)}%
              </td>
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
                    onClick={() => alert(`Clicked on ${row.stock}`)}
                  >
                    Exit
                  </button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
