import React, { useState } from 'react';
import Navbar from '../../Components/Navbar';
import { Box, Button, Radio, RadioGroup, Typography, TextField, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import { db } from '../../Config/Firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const SubjectsAdd = () => {
  const [subjectName, setSubjectName] = useState('');
  const [classNumber, setClassNumber] = useState(1);
  const [group, setGroup] = useState('');
  const navigate = useNavigate();
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);

  
  React.useEffect(() => {
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

  const handleClassChange = (event) => {
    const value = event.target.value;
    if (!isNaN(value) && value !== '') {
      setClassNumber(parseInt(value, 10));
    } else {
      setClassNumber('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await addDoc(collection(db, 'subjects'), {
        subjectName,
        classNumber: classNumber.toString(),
        group,
      });

      setSubjectName('');
      setClassNumber(1);
      setGroup('');
      
      navigate('/SubjectList'); 
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div>
      <Navbar />
      <Box
        sx={{
          width: isSidebarClosed ? 'calc(100% - 60px)' : 'calc(100% - 250px)', 
          marginLeft: isSidebarClosed ? 0 : '250px', 
          transition: 'width 0.3s, margin-left 0.3s', 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 4,
          padding: 2,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            textDecoration: 'underline',
            marginBottom: 4,
          }}
        >
          Add Subject
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            width: '100%',
            maxWidth: 500,
          }}
        >
          <FormControl fullWidth sx={{ paddingBottom: 2 }}>
            <FormLabel>Subject Name:</FormLabel>
            <TextField
              variant="outlined"
              placeholder="Enter the subject name"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              required
              fullWidth
            />
          </FormControl>

          <FormControl fullWidth sx={{ paddingBottom: 2 }}>
            <FormLabel>Class:</FormLabel>
            <TextField
              variant="outlined"
              type="number"
              value={classNumber}
              onChange={handleClassChange}
              InputProps={{
                inputProps: { min: 0, max: 20 },
              }}
              required
              fullWidth
            />
          </FormControl>

          <FormControl component="fieldset" fullWidth sx={{ marginBottom: 2 }}>
            <FormLabel component="legend" sx={{ color: 'green', marginBottom: 1 }}>Select Group</FormLabel>
            <RadioGroup
              aria-label="group"
              name="group"
              value={group}
              onChange={(e) => setGroup(e.target.value)}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <FormControlLabel
                value="General-Science"
                control={<Radio required />}
                label={
                  <Typography variant="h6">General-Science</Typography>
                }
              />
              <FormControlLabel
                value="Pre-Engineering"
                control={<Radio required />}
                label={
                  <Typography variant="h6">Pre-Engineering</Typography>
                }
              />
            </RadioGroup>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: 'green',
              marginTop: 2,
              width: '100%',
              padding: '10px 0',
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default SubjectsAdd;
