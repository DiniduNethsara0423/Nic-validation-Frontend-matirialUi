import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Grid,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Layout from "./layout";


const SearchByFileName = () => {
  const [fileName, setFileName] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [nicData, setNicData] = useState([]);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    axios.get('http://localhost:8080/file/names')
      .then((response) => {
        setUploadedFiles(response.data);
      })
      .catch((error) => {
        console.error('Error fetching file names:', error);
      });
  }, []);

  useEffect(() => {
    if (fileName) {
      axios.get(`http://localhost:8080/nic/getByFileName/${fileName}`)
        .then((response) => {
          setNicData(response.data || []);
          console.log(response.data);
        })

        .catch((error) => {
          console.error('Error fetching NIC data:', error);
        });
    }
  }, [fileName]);

  return (
    <Layout>
    <div style={{ padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        NIC Details
      </Typography>
      <Grid container spacing={2} alignItems="center">
        {/* CSV File Selection */}
        <Grid item xs={12} md={5}>
          <TextField
            select
            label="Select CSV File"
            fullWidth
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          >
            {uploadedFiles.map((file) => (
              <MenuItem key={file.id} value={file.fileName}>
                {file.fileName}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table size={isSmallScreen ? 'small' : 'medium'}>
          <TableHead>
            <TableRow>
              <TableCell><b>Age</b></TableCell>
              <TableCell><b>Birthday</b></TableCell>
              <TableCell><b>Gender</b></TableCell>
              <TableCell><b>NIC Number</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {nicData.map((item, index) => (
              <TableRow key={index} hover>
                <TableCell>{item.age}</TableCell>
                <TableCell>{item.birthday}</TableCell>
                <TableCell>{item.gender}</TableCell>
                <TableCell>{item.nicNumber}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    </Layout>
  );
};

export default SearchByFileName;
