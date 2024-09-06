import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import Navbar from '../../Components/Navbar';

const ExamSchedule = () => {
  const scheduleData = Array.from({ length: 20 }, (_, index) => ({
    className: `Class ${index + 1}-English`,
    date: `${index + 1}-9-2024`,
    startTime: `0${index % 12 + 1}:00 AM`,
    endTime: `0${(index + 1) % 12 + 1}:00 AM`,
  }));

  return (
    <div>
      <Navbar/>
    
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
        maxWidth: 'calc(100% - 240px)', 
        marginLeft: '240px', 
        overflowX: 'hidden', 
        '@media (max-width: 600px)': {
          marginLeft: 0,
          maxWidth: '100%',
        },
      }}
    >
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          textDecoration: 'underline', 
          marginBottom: 2 
        }}
      >
        Exam Schedule
      </Typography>

      {scheduleData.map((schedule, index) => (
        <Paper 
          key={index} 
          elevation={3} 
          sx={{ 
            padding: 2, 
            marginBottom: 2, 
            width: '100%', 
            maxWidth: '800px',
            borderRadius: 2,
            '@media (max-width: 600px)': { 
              maxWidth: '100%',
            },
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
            {schedule.className}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Date: {schedule.date}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Start Time: {schedule.startTime} | End Time: {schedule.endTime}
          </Typography>
          <Button 
            variant="contained" 
            sx={{ 
              marginTop: 2, 
              backgroundColor: 'green', 
              color: 'white',
              '&:hover': { backgroundColor: 'darkgreen' }
            }}
          >
            View Details
          </Button>
        </Paper>
      ))}
    </Box>
    </div>
  );
};

export default ExamSchedule;
