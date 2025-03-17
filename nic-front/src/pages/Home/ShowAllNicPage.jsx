import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Typography, useMediaQuery, useTheme, Container, TextField,
    Button, ButtonGroup, TablePagination
} from '@mui/material';
import { motion } from 'framer-motion';
import Layout from "./layout";

const ShowAllNicPage = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isLaptopScreen = useMediaQuery(theme.breakpoints.up('md'));
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        fetchData();
    }, [filter]);

    const fetchData = async () => {
        try {
            let url = 'http://localhost:8080/nic/get-all';
            if (filter === 'male') url = 'http://localhost:8080/nic/allMale';
            if (filter === 'female') url = 'http://localhost:8080/nic/allFemale';

            const response = await axios.get(url);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching NIC data:', error);
        }
    };

    // Apply search filter before pagination
    const filteredData = data.filter(item =>
        Object.values(item).some(value =>
            value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    // Paginate filtered data
    const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Layout>
            <Container maxWidth={isLaptopScreen ? false : "md"} style={{ padding: '20px' }}>
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <Typography variant={isSmallScreen ? 'h6' : 'h5'} gutterBottom>
                        NIC Details
                    </Typography>
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setPage(0); // Reset page when searching
                        }}
                        style={{ marginBottom: '15px' }}
                    />
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    <ButtonGroup fullWidth style={{ marginBottom: '15px' }}>
                        <Button variant={filter === 'all' ? "contained" : "outlined"} onClick={() => setFilter('all')}>All</Button>
                        <Button variant={filter === 'male' ? "contained" : "outlined"} onClick={() => setFilter('male')}>Male</Button>
                        <Button variant={filter === 'female' ? "contained" : "outlined"} onClick={() => setFilter('female')}>Female</Button>
                    </ButtonGroup>
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
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
                                {paginatedData.map((item, index) => (
                                    <motion.tr key={index} whileHover={{ scale: 1.02 }}>
                                        <TableCell>{item.age}</TableCell>
                                        <TableCell>{item.birthday}</TableCell>
                                        <TableCell>{item.gender}</TableCell>
                                        <TableCell>{item.nicNumber || 'N/A'}</TableCell>
                                    </motion.tr>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </motion.div>

                <TablePagination
                    component="div"
                    count={filteredData.length}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onPageChange={(event, newPage) => setPage(newPage)}
                    onRowsPerPageChange={(event) => {
                        setRowsPerPage(parseInt(event.target.value, 10));
                        setPage(0); 
                    }}
                />
            </Container>
        </Layout>
    );
};

export default ShowAllNicPage;
