import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/Navbar';
import {
  Box,
  Button,
  Typography,
  TextField,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
import { db } from '../../Config/Firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const ClassForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dob, setDob] = useState('');
  const [qualification, setQualification] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [group, setGroup] = useState('');
  const [gender, setGender] = useState('');
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchClasses = async () => {
      const querySnapshot = await getDocs(collection(db, 'classes'));
      const classesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setClasses(classesData);
    };

    fetchClasses();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await addDoc(collection(db, 'studentDetails'), {
        firstName,
        lastName,
        fatherName,
        email,
        phoneNumber,
        dob,
        qualification,
        className: selectedClass,
        group,
        gender,
      });

      setFirstName('');
      setLastName('');
      setFatherName('');
      setEmail('');
      setPhoneNumber('');
      setDob('');
      setQualification('');
      setSelectedClass('');
      setGroup('');
      setGender('');

      navigate('/ClassList');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div>
      <Navbar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 4,
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
          Admission Form
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
            maxWidth: 400,
          }}
        >
         
          <FormControl fullWidth sx={{ paddingBottom: 2 }}>
            <FormLabel>First Name:</FormLabel>
            <TextField
              variant="outlined"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </FormControl>

          <FormControl fullWidth sx={{ paddingBottom: 2 }}>
            <FormLabel>Last Name:</FormLabel>
            <TextField
              variant="outlined"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </FormControl>

          <FormControl fullWidth sx={{ paddingBottom: 2 }}>
            <FormLabel>Father Name:</FormLabel>
            <TextField
              variant="outlined"
              placeholder="Enter your father's name"
              value={fatherName}
              onChange={(e) => setFatherName(e.target.value)}
              required
            />
          </FormControl>

          <FormControl fullWidth sx={{ paddingBottom: 2 }}>
            <FormLabel>Email:</FormLabel>
            <TextField
              variant="outlined"
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormControl>

      
          <FormControl fullWidth sx={{ paddingBottom: 2 }}>
            <FormLabel>Phone Number:</FormLabel>
            <TextField
              variant="outlined"
              placeholder="Enter your phone number"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </FormControl>

          <FormControl fullWidth sx={{ paddingBottom: 2 }}>
            <FormLabel>Date of Birth:</FormLabel>
            <TextField
              variant="outlined"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </FormControl>

          <FormControl fullWidth sx={{ paddingBottom: 2 }}>
            <FormLabel>Qualification:</FormLabel>
            <TextField
              variant="outlined"
              placeholder="Enter your qualification"
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
              required
            />
          </FormControl>

          <FormControl component="fieldset" fullWidth sx={{ marginBottom: 2 }}>
            <FormLabel component="legend" sx={{ color: 'green', marginBottom: 1 }}>Gender</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <FormControlLabel
                value="female"
                control={<Radio required />}
                label={
                  <Typography variant="h6">Female</Typography>
                }
              />
              <FormControlLabel
                value="male"
                control={<Radio required />}
                label={
                  <Typography variant="h6">Male</Typography>
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

export default ClassForm;
