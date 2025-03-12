import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Modal,
  Box,
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import { saveAs } from "file-saver";
import { Document, Page, pdfjs } from "react-pdf";

// Set worker path for pdfjs (needed for previewing PDFs)
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function GenerateReportsPage() {
  const [fileName, setFileName] = useState("");
  const [reportType, setReportType] = useState("");
  const [pdfPreview, setPdfPreview] = useState(null);
  const [open, setOpen] = useState(false);

  // Dummy uploaded CSV files (Replace with actual API response)
  const uploadedFiles = ["students_data.csv", "payments.csv", "attendance.csv"];

  // Function to request report generation and download from backend
  const handleGenerateReport = async () => {
    if (!fileName || !reportType) {
      alert("Please select a CSV file and a report type.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/download-report?fileName=${fileName}&type=${reportType}`,
        { responseType: "blob" }
      );

      const fileBlob = new Blob([response.data], {
        type:
          reportType === "pdf"
            ? "application/pdf"
            : reportType === "csv"
            ? "text/csv"
            : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const fileURL = URL.createObjectURL(fileBlob);

      if (reportType === "pdf") {
        setPdfPreview(fileURL);
        setOpen(true);
      } else {
        saveAs(fileBlob, `${fileName.split(".")[0]}.${reportType}`);
      }
    } catch (error) {
      console.error("Error downloading report:", error);
      alert("Failed to generate report. Try again.");
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

            {/* Report Type Selection */}
            <Grid item xs={12} md={5}>
              <TextField
                select
                label="Select Report Type"
                fullWidth
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                {["xlsx", "csv", "pdf"].map((type, index) => (
                  <MenuItem key={index} value={type}>
                    {type.toUpperCase()}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Generate & Download Buttons */}
            <Grid item xs={12} md={2}>
              <IconButton
                color="primary"
                onClick={handleGenerateReport}
                sx={{ mr: 1 }}
              >
                <FileDownloadIcon />
              </IconButton>

              {reportType === "pdf" && pdfPreview && (
                <IconButton color="secondary" onClick={() => setOpen(true)}>
                  <VisibilityIcon />
                </IconButton>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* PDF Preview Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            height: "80%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 2,
            overflow: "auto",
          }}
        >
          <Typography variant="h6" textAlign="center">
            PDF Preview
          </Typography>
          {pdfPreview && (
            <Document file={pdfPreview}>
              <Page pageNumber={1} />
            </Document>
          )}
        </Box>
      </Modal>
    </Container>
  );
}

export default GenerateReportsPage;
