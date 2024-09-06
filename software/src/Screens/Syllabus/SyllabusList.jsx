import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar';
import { Box, Button, Typography, CircularProgress, useMediaQuery } from '@mui/material';
import { db } from '../../Config/Firebase';
import { collection, getDocs } from 'firebase/firestore';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'subjectName', headerName: 'Subject Name', width: 150 },
  { field: 'classNumber', headerName: 'Class', width: 100 },
  {
    field: 'pdfURL',
    headerName: 'Download',
    width: 150,
    renderCell: (params) => (
      <Button
      variant="contained"
      sx={{ backgroundColor: 'green', '&:hover': { backgroundColor: 'darkgreen' } }}
      onClick={() => window.open(params.value, '_blank')}
    >
      Download PDF
    </Button>
    ),
  },
];

const SyllabusList = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const navigate = useNavigate();
  
  const isSmallScreen = useMediaQuery('(max-width:900px)');

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'syllabus'));
        const subjectData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRows(subjectData);
      } catch (error) {
        console.error('Error fetching subjects: ', error);
        setError('Error fetching subjects');
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <div style={{ width: '100%' }}>
      <Navbar />
      <Box
        sx={{
          width: isSmallScreen ? '100%' : `calc(100% - 240px)`, 
          margin: '20px auto',
          backgroundColor: '#f0f0f0',
          padding: '20px',
          borderRadius: '8px',
          paddingTop: '20px', 
          marginLeft: isSmallScreen ? '0' : '240px', 
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, textAlign: 'center' }}>
          Syllabus List
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: 'green' }}
            onClick={() => navigate('/SyllabusForm')}
          >
            Add
          </Button>
        </Box>
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{ overflow: 'clip' }}
          />
        </Box>
      </Box>
    </div>
  );
};

export default SyllabusList;
