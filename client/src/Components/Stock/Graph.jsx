import React, { useState } from 'react';
import { 
    Box, 
    Typography, 
    ButtonGroup, 
    Button
} from '@mui/material';
import { 
    LineChart, 
    Line, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend, 
    ResponsiveContainer, 
    Area,
    ComposedChart
} from 'recharts';

const mockStockData = {
    historicalPrices: [
        { date: "2023-11-20", price: 100},
        { date: "2023-11-21", price: 105},
        { date: "2023-11-22", price: 102},
        { date: "2023-11-23", price: 110},
        { date: "2023-11-24", price: 108,},
        { date: "2023-11-25", price: 115},
        { date: "2023-11-26", price: 112 },
        { date: "2023-11-27", price: 120},
        { date: "2023-11-28", price: 118},
        { date: "2023-11-29", price: 125},
        { date: "2023-11-30", price: 122}
    ]
};

export default function Graph() {
    const [timeFrame, setTimeFrame] = useState('1M');
    const { historicalPrices } = mockStockData;

    // Color scheme
    const colors = {
        primary: '#3f51b5',
        secondary: '#f50057',
        background: '#f4f4f4',
        gridLine: '#e0e0e0'
    };

    // Custom Tooltip
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <Box 
                    sx={{ 
                        background: 'white', 
                        border: '1px solid #ddd', 
                        p: 2, 
                        borderRadius: 2 
                    }}
                >
                    <Typography variant="body2" color="text.secondary">
                        {label}
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                        Price: ${payload[0].value.toFixed(2)}
                    </Typography>
                </Box>
            );
        }
        return null;
    };

    return (
        <Box sx={{ 
            width: '100%', 
            height: '95%', 
            display: 'flex', 
            flexDirection: 'column' 
        }}>
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                mb: 2,
                px: 2
            }}>
        
                    

            </Box>
            
            <Box sx={{ flexGrow: 1, width: '100%', height: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart 
                        data={historicalPrices}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <defs>
                            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={colors.primary} stopOpacity={0.8}/>
                                <stop offset="95%" stopColor={colors.primary} stopOpacity={0.1}/>
                            </linearGradient>
                        </defs>
                        
                        <CartesianGrid 
                            strokeDasharray="3 3" 
                            stroke={colors.gridLine} 
                            vertical={false}
                        />
                        
                        <XAxis 
                            dataKey="date" 
                            axisLine={false}
                            tickLine={false}
                        />
                        
                        <YAxis 
                            axisLine={false}
                            tickLine={false}
                        />
                        
                        <Tooltip content={<CustomTooltip />} />
                        
                        <Legend 
                            verticalAlign="top" 
                            height={36}
                        />
                        
                        <Area 
                            type="monotone" 
                            dataKey="price" 
                            stroke={colors.primary}
                            fillOpacity={1}
                            fill="url(#colorPrice)"
                        />
                        
                    </ComposedChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    );
}