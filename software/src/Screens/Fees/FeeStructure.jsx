import React from 'react';
import Navbar from '../../Components/Navbar';
import { Box, Typography, Grid } from '@mui/material';

const FeeStructure = () => {
  const classesFees = [
    { className: 'Class 1', monthlyFee: 500, yearlyFee: 6000 },
    { className: 'Class 2', monthlyFee: 600, yearlyFee: 7200 },
    { className: 'Class 3', monthlyFee: 700, yearlyFee: 8400 },
    { className: 'Class 4', monthlyFee: 800, yearlyFee: 9600 },
    { className: 'Class 5', monthlyFee: 900, yearlyFee: 10800 },
    { className: 'Class 6', monthlyFee: 1000, yearlyFee: 12000 },
    { className: 'Class 7', monthlyFee: 1100, yearlyFee: 13200 },
    { className: 'Class 8', monthlyFee: 1200, yearlyFee: 14400 },
    { className: 'Class 9', monthlyFee: 1300, yearlyFee: 15600 },
    { className: 'Class 10', monthlyFee: 1400, yearlyFee: 16800 },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '240px', 
        padding: 2,
        width: 'calc(100% - 240px)',
        overflowX: 'hidden', 
        '@media (max-width: 600px)': {
          marginLeft: 0,
          width: '100%',
        },
      }}
    >
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
          Fee Structure
        </Typography>

        <Grid container spacing={2} sx={{ width: '100%', maxWidth: 1200 }}>
          {classesFees.map((fee, index) => (
            <Grid item xs={12} key={index}>
              <Box
                sx={{
                  backgroundColor: '#ffffff',
                  padding: 2,
                  borderRadius: 6,
                  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                  width: '100%',
                  maxWidth: 600,
                  margin: '0 auto',
                }}
              >
                <Typography variant="h6" sx={{ textAlign: 'center', marginBottom: 1 }}>
                  {fee.className}
                </Typography>
                <Typography variant="body1" sx={{ color: 'green' }}>
                  Monthly Fee: <span style={{ float: 'right' }}>Rs: {fee.monthlyFee}</span>
                </Typography>
                <Typography variant="body1">
                  Yearly Fee: <span style={{ float: 'right' }}>Rs: {fee.yearlyFee}</span>
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default FeeStructure;
