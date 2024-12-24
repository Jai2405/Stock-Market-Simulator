import { useState, useEffect } from 'react';
import Dashboard from '../Components/Home/Dashboard';
import usePortfolioData from './PortfolioFetch';
//import { useData } from './Datafetch';
import './Home.css';


export default function Home() {
    const {
        portfolio,
        portfolioValue,
        investmentValue,
        profitLoss,
        bestPerformingStocks,
        worstPerformingStocks,
        loading,
        error,
      } = usePortfolioData();
    
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error: {error}</div>;

  
    return (
        <div className='home-container'>
            <div className="dashboard-wrapper">
                <div className="dashboard-section">
                    <Dashboard 
                    portfolioValue={portfolioValue}
                    investmentValue={investmentValue}
                    profitLoss={profitLoss}
                    bestPerformingStocks={bestPerformingStocks}
                    worstPerformingStocks={worstPerformingStocks}
                    />
                </div>
            </div>
        </div>
    );
}