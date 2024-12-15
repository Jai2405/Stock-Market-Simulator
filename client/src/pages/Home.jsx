import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Dashboard from '../Components/Home/Dashboard';
import TrendingStocks from "../Components/Home/TrendingStocks";
import './Home.css';

export default function Home() {
    return (
        <>
        <div className='home-container'>
            <div className="left-section">
                <div className='search-bar'>
                    <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' } }} noValidate autoComplete="off" >
                        <TextField id="standard-basic" label="Search eg: AAPL, AMD etc " variant="standard" />
                    </Box>
                </div>

                <div className='trending-stocks'>
                    <TrendingStocks/>
                </div>
            </div>

            <div className="right-section">
                <Dashboard />
            </div>
        </div>
        </>
    );
}

