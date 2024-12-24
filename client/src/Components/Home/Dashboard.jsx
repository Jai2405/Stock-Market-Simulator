import PortfolioSummary from "./PortfolioSummary";
import StockPerformance from "./StockPerformace";
import SPGraph from "./SPGraph";
import { Box, Container } from "@mui/material";

export default function Dashboard(props) {
    return (
      <Container>

        {/* Dashboard summary and performance section */}
        <Box className="dashboard" display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={1}>
          <Box className="portfolio-summary">
            <PortfolioSummary
                portfolioValue={props.portfolioValue}
                investmentValue={props.investmentValue}
                profitLoss={props.profitLoss}
             />
          </Box>

          <Box className="stock-performance">
            <StockPerformance
            bestPerformingStocks={props.bestPerformingStocks}
            worstPerformingStocks={props.worstPerformingStocks} />
          </Box>
        </Box>

        {/* Main graph and other components */}
        <Box 
          className="rest" 
          display="flex" 
          flexDirection={{ xs: "column", md: "row" }} 
          alignItems={{ xs: "center", md: "flex-start" }} 
          justifyContent="center"
          p={2}
        >
          {/* SPGraph adjusted for size and left alignment */}
          <Box 
            className="spgraph" 
            flex={{ xs: "1", md: "1.5" }} 
            mr={{ md: 2 }} 
            width="100%" 
            maxWidth="800px"
          >
            <SPGraph/>
          </Box>

          {/* Optional: Other section */}

        </Box>
      </Container>
    );
}
