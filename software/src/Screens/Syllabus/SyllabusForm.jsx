import React, { useState } from 'react';
import Navbar from '../../Components/Navbar';
import { Box, Button, Typography, TextField, FormControl, FormLabel } from '@mui/material';
import { db, storage } from '../../Config/Firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

const SyllabusForm = () => {
  const [subjectName, setSubjectName] = useState('');
  const [classNumber, setClassNumber] = useState(1);
  const [pdfFile, setPdfFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [loading, setLoading] = useState(false); 
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);
  const navigate = useNavigate();

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

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
    setUploadStatus('PDF uploaded');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!pdfFile) {
      alert('Please upload a PDF');
      return;
    }

    setLoading(true);
    setUploadStatus('Uploading...');

    try {
      const storageRef = ref(storage, `syllabus/${pdfFile.name}`);
      await uploadBytes(storageRef, pdfFile);
      const pdfURL = await getDownloadURL(storageRef);

      await addDoc(collection(db, 'syllabus'), {
        subjectName,
        classNumber: classNumber.toString(),
        pdfURL,
      });

      setUploadStatus('Syllabus added successfully!');
      setSubjectName('');
      setClassNumber(1);
      setPdfFile(null);
      navigate('/SyllabusList');
    } catch (error) {
      console.error('Error adding document: ', error);
      setUploadStatus('Error uploading PDF');
    } finally {
      setLoading(false);
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
          padding: 2,
          width: isSidebarClosed ? 'calc(100% - 60px)' : 'calc(100% - 250px)',
          marginLeft: isSidebarClosed ? 0 : '250px', 
          transition: 'width 0.3s, margin-left 0.3s',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            textDecoration: 'underline',
            marginBottom: 4,
            textAlign: 'center',
          }}
        >
          Syllabus Add
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
            backgroundColor: '#f9f9f9',
            padding: 3,
            borderRadius: 2,
            boxShadow: 3,
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
              onChange={(e) => setClassNumber(parseInt(e.target.value, 10))}
              InputProps={{
                inputProps: { min: 0, max: 20 },
              }}
              required
              fullWidth
            />
          </FormControl>

          <Button
            variant="contained"
            component="label"
            sx={{
              backgroundColor: 'green',
              width: '100%',
              padding: '10px 0',
              marginBottom: 1,
            }}
          >
            Upload PDF
            <input type="file" hidden onChange={handleFileChange} accept="application/pdf" />
          </Button>

          {uploadStatus && (
            <Typography variant="body1" color="green" sx={{ marginTop: 1 }}>
              {uploadStatus}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: 'green',
              marginTop: 2,
              width: '100%',
              padding: '10px 0',
            }}
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add'}
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default SyllabusForm;
