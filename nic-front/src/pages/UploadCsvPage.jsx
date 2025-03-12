import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid2,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

function UploadCsvPage() {
  const [files, setFiles] = useState([]);

  // Handle file selection
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files).slice(0, 4); // Max 4 files
    setFiles(selectedFiles);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Upload CSV Files
      </Typography>

      <Card sx={{ p: 3, textAlign: "center", boxShadow: 3 }}>
        <CardContent>
          <CloudUploadIcon sx={{ fontSize: 60, color: "#42A5F5" }} />
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
            <Button
              variant="contained"
              component="span"
              color="primary"
              sx={{ mt: 2 }}
            >
              Choose Files
            </Button>
          </label>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            (Maximum 4 files)
          </Typography>
        </CardContent>
      </Card>

      {/* File Preview */}
      {files.length > 0 && (
        <Card sx={{ mt: 3, p: 2, boxShadow: 2 }}>
          <Typography variant="h6">Selected Files</Typography>
          <List>
            {files.map((file, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <InsertDriveFileIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary={file.name} />
              </ListItem>
            ))}
          </List>
        </Card>
      )}

      {/* Upload Button */}
      {files.length > 0 && (
        <Grid2 container justifyContent="center" sx={{ mt: 3 }}>
          <Button variant="contained" color="success">
            Upload Files
          </Button>
        </Grid2>
      )}
    </Container>
  );
}

export default UploadCsvPage;
