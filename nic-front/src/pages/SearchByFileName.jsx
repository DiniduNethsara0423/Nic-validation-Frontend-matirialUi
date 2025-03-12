import React, { useState } from 'react';
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

const SearchByFileName = () => {
  const [fileName, setFileName] = useState('');
  const uploadedFiles = ['file1.csv', 'file2.csv', 'file3.csv']; // Example files
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const data = [
    { age: 25, birthday: '1999-05-12', gender: 'Male', nic_number: '992345678V' },
    { age: 30, birthday: '1994-08-23', gender: 'Female', nic_number: '942345678V' },
    { age: 22, birthday: '2002-11-15', gender: 'Male', nic_number: '022345678V' },
  ];

  return (
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
            {uploadedFiles.map((file, index) => (
              <MenuItem key={index} value={file}>
                {file}
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
            {data.map((item, index) => (
              <TableRow key={index} hover>
                <TableCell>{item.age}</TableCell>
                <TableCell>{item.birthday}</TableCell>
                <TableCell>{item.gender}</TableCell>
                <TableCell>{item.nic_number}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SearchByFileName;
