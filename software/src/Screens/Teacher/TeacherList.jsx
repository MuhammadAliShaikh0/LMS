import * as React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar';
import { Box, Button, Typography } from '@mui/material';
import { db } from '../../Config/Firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useMediaQuery } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'email',
    headerName: 'Email',
    width: 160,
  },
];

export default function DataTable() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery('(max-width:900px)');

  useEffect(() => {
    const fetchStudents = async () => {
      const querySnapshot = await getDocs(collection(db, 'Teachers'));
      const TeacherData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRows(TeacherData);
    };

    fetchStudents();
  }, []);

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
          marginLeft: isSmallScreen ? '0' : '240px',
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, textAlign: 'center' }}>
          Teachers List
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: 'green' }}
            onClick={() => navigate('/TeacherRegistration')}
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
}
