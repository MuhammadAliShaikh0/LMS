import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/Navbar';
import { Box, Typography, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FeeVoucher = () => {
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);
  const navigate = useNavigate();

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

  const classesFees = [
    { className: 'Fee Voucher - Class 1', monthlyFee: 500, yearlyFee: 6000, Class: "Class 1" },
    { className: 'Fee Voucher - Class 2', monthlyFee: 600, yearlyFee: 7200, Class: "Class 2" },
    { className: 'Fee Voucher - Class 3', monthlyFee: 700, yearlyFee: 8400, Class: "Class 3" },
    { className: 'Fee Voucher - Class 4', monthlyFee: 800, yearlyFee: 9600, Class: "Class 4" },
    { className: 'Fee Voucher - Class 5', monthlyFee: 900, yearlyFee: 10800, Class: "Class 5" },
    { className: 'Fee Voucher - Class 6', monthlyFee: 1000, yearlyFee: 12000, Class: "Class 6" },
    { className: 'Fee Voucher - Class 7', monthlyFee: 1100, yearlyFee: 13200, Class: "Class 7" },
    { className: 'Fee Voucher - Class 8', monthlyFee: 1200, yearlyFee: 14400, Class: "Class 8" },
    { className: 'Fee Voucher - Class 9', monthlyFee: 1300, yearlyFee: 15600, Class: "Class 9" },
    { className: 'Fee Voucher - Class 10', monthlyFee: 1400, yearlyFee: 16800, Class: "Class 10" },
  ];

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
        <Typography
          variant="h4"
          sx={{
            textDecoration: 'underline',
            marginBottom: 4,
            textAlign: 'center',
          }}
        >
          Fee Voucher
        </Typography>

        <Grid container spacing={2} sx={{ width: '100%' }}>
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
                  position: 'relative',
                }}
              >
                <Typography variant="h6" sx={{ textAlign: 'center', marginBottom: 1 }}>
                  {fee.className}
                </Typography><br/>
                <Typography variant="body1">
                  Class: <span style={{ float: 'right' }}>{fee.Class}</span>
                </Typography><br/>
                <Typography variant="body1">
                  Monthly Fee: <span style={{ float: 'right' }}>Rs: {fee.monthlyFee}</span>
                </Typography><br/>
                <Typography variant="body1">
                  Yearly Fee: <span style={{ float: 'right' }}>Rs: {fee.yearlyFee}</span>
                </Typography><br/><br/>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: 'green',
                    color: 'white',
                    position: 'absolute',
                    bottom: 16,
                    left: '50%',
                    transform: 'translateX(-50%)',
                  }}
                  onClick={() => navigate('/FeeSubmission')}
                >
                  Pay Now
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default FeeVoucher;
