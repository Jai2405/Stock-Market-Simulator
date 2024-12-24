import React from 'react';
import { 
  Button, 
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Box,
  IconButton,
  InputAdornment,
  Divider
} from '@mui/material';
import { Close, TrendingUp, TrendingDown, Add, Remove } from '@mui/icons-material';

export default function StockTradeButtons({ onBuy, onSell, stockPrice = 100, stockSymbol = "AAPL" }) {
  const [open, setOpen] = React.useState(false);
  const [tradeType, setTradeType] = React.useState(null);
  const [shares, setShares] = React.useState('');

  const handleClickOpen = (type) => {
    setTradeType(type);
    setOpen(true);
    setShares('1');
  };

  const handleClose = () => {
    setOpen(false);
    setShares('');
  };

  const handleTrade = () => {
    if (tradeType === 'buy') {
      onBuy(Number(shares));
    } else {
      onSell(Number(shares));
    }
    handleClose();
  };

  const adjustShares = (amount) => {
    const newValue = Number(shares || 0) + amount;
    if (newValue >= 1) {
      setShares(String(newValue));
    }
  };

  const totalAmount = shares ? (shares * stockPrice).toFixed(2) : '0.00';

  return (
    <>
      <Stack 
        direction="row" 
        spacing={2} 
        sx={{ 
          width: '100%', 
          justifyContent: 'center', 
          my: 2 
        }}
      >
        <Button 
          variant="contained" 
          color="success" 
          size="large"
          startIcon={<TrendingUp />}
          onClick={() => handleClickOpen('buy')}
          sx={{
            borderRadius: 2,
            px: 4,
            py: 1.5,
            fontWeight: 'bold',
            textTransform: 'none',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              backgroundColor: '#2e7d32',
              transform: 'translateY(-8px)',
              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)'
            }
          }}
        >
          Buy
        </Button>

        <Button 
          variant="contained" 
          color="error"
          size="large"
          startIcon={<TrendingDown />}
          onClick={() => handleClickOpen('sell')}
          sx={{
            borderRadius: 2,
            px: 4,
            py: 1.5,
            fontWeight: 'bold',
            textTransform: 'none',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              backgroundColor: '#d32f2f',
              transform: 'translateY(-8px)',
              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)'
            }
          }}
        >
          Sell
        </Button>
      </Stack>

      <Dialog 
        open={open} 
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: 3,
            minWidth: '380px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
          }
        }}
      >
        <DialogTitle 
          sx={{ 
            pb: 1, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            bgcolor: tradeType === 'buy' ? 'success.light' : 'error.light',
            color: 'white'
          }}
        >
          <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {tradeType === 'buy' ? <TrendingUp /> : <TrendingDown />}
            {tradeType === 'buy' ? 'Buy' : 'Sell'} {stockSymbol}
          </Typography>
          <IconButton 
            onClick={handleClose}
            sx={{ color: 'white' }}
            size="small"
          >
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ 
              p: 2, 
              bgcolor: 'grey.50', 
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'grey.200'
            }}>
              <Typography variant="subtitle2" color="text.secondary">
                Current Price
              </Typography>
              <Typography variant="h5" color="text.primary" sx={{ fontWeight: 'bold' }}>
                ${stockPrice.toFixed(2)}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Number of Shares
              </Typography>
              <TextField
                fullWidth
                value={shares}
                onChange={(e) => setShares(e.target.value)}
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton onClick={() => adjustShares(-1)} size="small">
                        <Remove />
                      </IconButton>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => adjustShares(1)} size="small">
                        <Add />
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: { borderRadius: 2 }
                }}
                inputProps={{ min: 1 }}
              />
            </Box>

            <Divider />

            <Box sx={{ 
              p: 2, 
              bgcolor: tradeType === 'buy' ? 'success.50' : 'error.50', 
              borderRadius: 2,
              border: '1px solid',
              borderColor: tradeType === 'buy' ? 'success.200' : 'error.200'
            }}>
              <Typography variant="subtitle2" color="text.secondary">
                Total Amount
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: tradeType === 'buy' ? 'success.dark' : 'error.dark' }}>
                ${totalAmount}
              </Typography>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3, pt: 2 }}>
          <Button 
            onClick={handleClose} 
            variant="outlined"
            sx={{ 
              borderRadius: 2,
              px: 3,
              textTransform: 'none'
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleTrade}
            variant="contained"
            color={tradeType === 'buy' ? 'success' : 'error'}
            disabled={!shares || shares <= 0}
            sx={{ 
              borderRadius: 2,
              px: 4,
              textTransform: 'none',
              boxShadow: 2
            }}
          >
            {tradeType === 'buy' ? 'Buy Now' : 'Sell Now'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}