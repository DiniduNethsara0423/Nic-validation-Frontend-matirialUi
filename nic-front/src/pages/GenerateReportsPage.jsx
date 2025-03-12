import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Card,
  CardContent,
  Grid,
  IconButton,
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import axios from "axios";
import { saveAs } from "file-saver";

function GenerateReportsPage() {
  const [fileName, setFileName] = useState("");
  const [reportType, setReportType] = useState("");
  const [fileNames, setFileNames] = useState([]);

  // Fetch available file names from API
  useEffect(() => {
    const fetchFileNames = async () => {
      try {
        const response = await axios.get("http://localhost:8080/file/names");
        setFileNames(response.data.map((file) => file.fileName));
      } catch (error) {
        console.error("Error fetching file names:", error);
      }
    };

    fetchFileNames();
  }, []);

  // Handle file download
  const handleGenerateReport = async () => {
    if (!fileName || !reportType) {
      alert("Please select a file and a report type.");
      return;
    }

    const apiUrl = `http://localhost:8080/nic/export/${reportType}/${fileName}`;

    try {
      const response = await axios.get(apiUrl, { responseType: "blob" });

      // Create a Blob from the response
      const fileBlob = new Blob([response.data], {
        type:
          reportType === "pdf"
            ? "application/pdf"
            : reportType === "csv"
            ? "text/csv"
            : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Download file
      saveAs(fileBlob, `${fileName.split(".")[0]}.${reportType}`);
    } catch (error) {
      console.error("Error downloading report:", error);
      alert("Failed to generate the report. Please try again.");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Generate Reports
      </Typography>

      <Card sx={{ p: 3, boxShadow: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            {/* File Selection Dropdown */}
            <Grid item xs={12} md={5}>
              <TextField
                select
                label="Select File"
                fullWidth
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
              >
                {fileNames.map((file, index) => (
                  <MenuItem key={index} value={file}>
                    {file}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Report Type Selection */}
            <Grid item xs={12} md={5}>
              <TextField
                select
                label="Select Report Type"
                fullWidth
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                {["xlsx", "csv", "pdf"].map((type) => (
                  <MenuItem key={type} value={type}>
                    {type.toUpperCase()}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Download Button */}
            <Grid item xs={12} md={2}>
              <IconButton color="primary" onClick={handleGenerateReport}>
                <FileDownloadIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

export default GenerateReportsPage;
