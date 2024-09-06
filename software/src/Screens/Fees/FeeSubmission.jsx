import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/Navbar';
import { Box, Typography, TextField, FormControl, FormLabel, Select, MenuItem, Button } from '@mui/material';

const FeeSubmission = () => {
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 900) {
        setIsSidebarClosed(true);
      } else {
        setIsSidebarClosed(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); 

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      <Navbar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          backgroundColor: '#f2f2f2',
          padding: 4,
          width: isSidebarClosed ? 'calc(100% - 60px)' : 'calc(100% - 250px)', 
          margin: '0 auto',
          transition: 'width 0.3s',
          marginLeft: isSidebarClosed ? 0 : '250px', 
        }}
      >
        <Box
          sx={{
            backgroundColor: '#ffffff',
            padding: 4,
            borderRadius: 6,
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            width: '80%',
            maxWidth: 600,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              textDecoration: 'underline',
              marginBottom: 4,
              textAlign: 'center',
            }}
          >
            Payment for
          </Typography>

          <form>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <FormLabel>Name</FormLabel>
              <TextField
                variant="outlined"
                placeholder="Enter your name"
                required
              />
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <FormLabel>Class</FormLabel>
              <TextField
                variant="outlined"
                placeholder="Enter the class"
                disabled
                required
              />
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <FormLabel>Amount</FormLabel>
              <TextField
                variant="outlined"
                placeholder="Enter the amount"
                disabled
                required
              />
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <FormLabel>Payment Method</FormLabel>
              <Select
                variant="outlined"
                defaultValue=""
                required
              >
                <MenuItem value="credit-card">Credit Card</MenuItem>
                <MenuItem value="debit-card">Debit Card</MenuItem>
                <MenuItem value="net-banking">Net Banking</MenuItem>
                <MenuItem value="upi">UPI</MenuItem>
              </Select>
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: 'green',
                color: 'white',
                marginTop: 2,
                width: '100%',
                padding: '10px 0',
              }}
            >
              Submit Payment
            </Button>
          </form>
        </Box>
      </Box>
    </div>
  );
};

export default FeeSubmission;
