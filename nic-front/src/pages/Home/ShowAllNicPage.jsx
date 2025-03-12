import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
import Layout from "./layout";


const ShowAllNicPage = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isLaptopScreen = useMediaQuery(theme.breakpoints.up('md'));
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/nic/get-all');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching NIC data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Layout>
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
                                <TableCell>{item.nicNumber || 'N/A'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
        </Layout>
    );
};

export default ShowAllNicPage;
