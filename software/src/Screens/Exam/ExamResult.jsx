import React from 'react';
import Navbar from '../../Components/Navbar';
import { Box, Typography, Paper, useMediaQuery } from '@mui/material';

const ExamResult = () => {
  const resultData = Array.from({ length: 10 }, (_, index) => ({
    className: `Class ${index + 1} Result`,
    studentName: 'Student Name',
    rollNumber: 'Roll Number',
    grade: 'Grade',
  }));

  const isSmallScreen = useMediaQuery('(max-width:900px)');

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Navbar />
      <Box
        sx={{
          flexGrow: 1,
          marginLeft: isSmallScreen ? '0' : '10px', 
          paddingTop: '80px', 
          padding: 2,
          width: '100%',
          backgroundColor: '#f0f0f0',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 4,
            padding: 2,
            backgroundColor: '#f0f0f0',
            borderRadius: 2,
            width: '100%',
            maxWidth: '1200px',
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              textDecoration: 'underline',
              marginBottom: 2,
            }}
          >
            Exam Results
          </Typography>

          {resultData.map((result, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                marginBottom: 4,
                width: '100%',
                maxWidth: 800,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  color: 'text.primary',
                  marginBottom: 1,
                }}
              >
                {result.className}
              </Typography>

              <Paper
                elevation={3}
                sx={{
                  padding: 2,
                  width: '100%',
                  borderRadius: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {result.studentName}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {result.rollNumber}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {result.grade}
                </Typography>
              </Paper>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ExamResult;
