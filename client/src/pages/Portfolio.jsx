import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Portfolio.css';
import usePortfolioData from './PortfolioFetch';
import StockTable from '../Components/Portfolio/StockTable';
import SingleStackedBarChart from "../Components/Portfolio/InvestmentChart";
import {Box, Paper} from '@mui/material'

export default function Portfolio() {
    const {portfolio} = usePortfolioData();

    
    //console.log("THIS IS IT", portfolio);
    
    return (
        <div className="portfolio-container">
            <div className="portfolio-header">
                <h2>Investment Portfolio</h2>
            </div>



            <div className="portfolio-table-section">
                <h3>Stock Holdings</h3>
                <div className="portfolio-table">
                    <StockTable portfolio={portfolio} />
                </div>
            </div>

            <div className="portfolio-chart-section">
                <h3>Investment Distribution</h3>
                <SingleStackedBarChart portfolio={portfolio} />
            </div>
        </div>
    );
}