import React, { useState } from "react";
import axios from "axios";
import {
    Container,
    Typography,
    Button,
    Card,
    CardContent,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Snackbar,
    Alert,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { styled } from "@mui/system";
import Layout from "./layout";

const DropZone = styled(Paper)(({ theme }) => ({
    border: "2px dashed #42A5F5",
    padding: theme.spacing(4),
    textAlign: "center",
    cursor: "pointer",
    backgroundColor: "#f9f9f9",
    transition: "0.3s",
    "&:hover": {
        backgroundColor: "#f0f0f0",
    },
}));

function UploadCsvPage() {
    const [files, setFiles] = useState([]);
    const [uploadStatus, setUploadStatus] = useState({ open: false, message: "", severity: "success" });
    const [summary, setSummary] = useState(null);

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files).slice(0, 4);
        setFiles(selectedFiles);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFiles = Array.from(event.dataTransfer.files).slice(0, 4);
        setFiles(droppedFiles);
    };

    const handleUpload = async () => {
        if (files.length === 0) {
            setUploadStatus({ open: true, message: "No files selected!", severity: "error" });
            return;
        }

        const formData = new FormData();
        files.forEach((file) => formData.append("csv", file));

        try {
            const response = await axios.post("http://localhost:8080/nic", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setSummary(response.data); // Update real-time summary
            setUploadStatus({ open: true, message: "Files uploaded successfully!", severity: "success" });
            setFiles([]);
        } catch (error) {
            setUploadStatus({ open: true, message: "Upload failed. Please try again!", severity: "error" });
        }
    };

    return (
        <Layout>
            <Container maxWidth="md">
                <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", textAlign: "center", mt: 4 }}>
                    Upload CSV Files
                </Typography>

                {/* Drag & Drop Area */}
                <DropZone onDragOver={(e) => e.preventDefault()} onDrop={handleDrop} elevation={3}>
                    <CloudUploadIcon sx={{ fontSize: 70, color: "#42A5F5" }} />
                    <Typography variant="h6" gutterBottom>
                        Drag & Drop CSV files here or Click to Upload
                    </Typography>
                    <input
                        type="file"
                        accept=".csv"
                        multiple
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                        id="csv-upload"
                    />
                    <label htmlFor="csv-upload">
                        <Button variant="contained" component="span" color="primary" sx={{ mt: 2 }}>
                            Choose Files
                        </Button>
                    </label>
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                        (Maximum 4 files)
                    </Typography>
                </DropZone>

                {/* Selected Files */}
                {files.length > 0 && (
                    <Card sx={{ mt: 4, p: 2, boxShadow: 3, backgroundColor: "#f8f9fa" }}>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>Selected Files</Typography>
                        <List>
                            {files.map((file, index) => (
                                <ListItem key={index}>
                                    <ListItemIcon>
                                        <InsertDriveFileIcon color="primary" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={file.name.length > 25 ? file.name.slice(0, 25) + "..." : file.name}
                                        secondary={`${(file.size / 1024).toFixed(2)} KB`}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Card>
                )}

                {/* Upload Button */}
                {files.length > 0 && (
                    <Grid container justifyContent="center" sx={{ mt: 3 }}>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={handleUpload}
                            sx={{ px: 4, py: 1.5, fontSize: "1rem" }}
                        >
                            Upload Files
                        </Button>
                    </Grid>
                )}

                {/* Upload Status Snackbar */}
                <Snackbar
                    open={uploadStatus.open}
                    autoHideDuration={4000}
                    onClose={() => setUploadStatus({ ...uploadStatus, open: false })}
                >
                    <Alert severity={uploadStatus.severity}>{uploadStatus.message}</Alert>
                </Snackbar>

                {/* Real-time Summary */}
                {summary && (
                    <Card sx={{ mt: 4, p: 3, boxShadow: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center" }}>Processing Summary</Typography>
                        <TableContainer component={Paper} sx={{ mt: 2 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: "bold" }}>Metric</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }} align="right">Value</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Total NICs Processed</TableCell>
                                        <TableCell align="right">{summary.totalNicProcessed}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Duplicate Count</TableCell>
                                        <TableCell align="right">{summary.duplicateCount}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Invalid Count</TableCell>
                                        <TableCell align="right">{summary.invalidCount}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Saved Count</TableCell>
                                        <TableCell align="right">{summary.savedCount}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Card>
                )}
            </Container>
        </Layout>
    );
}

export default UploadCsvPage;
