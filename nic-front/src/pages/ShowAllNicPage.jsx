import React from 'react';
import {
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
  Container,
} from '@mui/material';

const ShowAllNicPage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isLaptopScreen = useMediaQuery(theme.breakpoints.up('md'));

  const data = [
    { age: 25, birthday: '1999-05-12', gender: 'Male', nic_number: '992345678V' },
    { age: 30, birthday: '1994-08-23', gender: 'Female', nic_number: '942345678V' },
    { age: 22, birthday: '2002-11-15', gender: 'Male', nic_number: '022345678V' },
  ];

  return (
    <Container maxWidth={isLaptopScreen ? false : "md"} style={{ padding: '20px' }}>
      <Typography variant={isSmallScreen ? 'h6' : 'h5'} gutterBottom>
        NIC Details
      </Typography>
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
    </Container>
  );
};

export default ShowAllNicPage;
