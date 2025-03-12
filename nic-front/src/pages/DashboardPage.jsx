import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Grid, Typography, Card, CardContent, CircularProgress } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

function DashboardPage() {
  // State variables for storing API data
  const [stats, setStats] = useState({
    nicCount: 0,
    maleCount: 0,
    femaleCount: 0,
    csvFilesUploaded: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API URLs (Replace with actual API endpoints)
  const API_URLS = {
    nicCount: "http://localhost:8080/nic/nicCount",
    maleCount: "http://localhost:8080/nic/getMaleCount",
    femaleCount: "http://localhost:8080/nic/getFemaleCount",
    csvFilesUploaded: "http://localhost:8080/file/fileCount",
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const responses = await Promise.all([
          axios.get(API_URLS.nicCount),
          axios.get(API_URLS.maleCount),
          axios.get(API_URLS.femaleCount),
          axios.get(API_URLS.csvFilesUploaded),
        ]);
  
        const newStats = {
          nicCount: responses[0].data,  // Directly store the number
          maleCount: responses[1].data,
          femaleCount: responses[2].data,
          csvFilesUploaded: responses[3].data,
        };
  
        console.log("Updated Stats:", newStats); // Check the data again
  
        setStats(newStats);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
        setLoading(false);
      }
    };
  
    fetchStats();
  }, []);
  
  
  
  const pieData = [
    { name: "Male", value: stats.maleCount },
    { name: "Female", value: stats.femaleCount },
  ];

  const COLORS = ["#42A5F5", "#F48FB1"];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight={600} textAlign="center">
        Dashboard
      </Typography>

      {loading ? (
        <Grid container justifyContent="center" sx={{ mt: 5 }}>
          <CircularProgress />
        </Grid>
      ) : error ? (
        <Typography color="error" textAlign="center">{error}</Typography>
      ) : (
        <Grid container spacing={3}>
          {[
  { label: "Total NIC Count", value: stats.nicCount },
  { label: "Male Count", value: stats.maleCount },
  { label: "Female Count", value: stats.femaleCount },
  { label: "Uploaded Files", value: stats.csvFilesUploaded },
].map((stat, index) => (
  <Grid item xs={12} sm={6} md={3} key={index}>
    <Card sx={{ textAlign: "center", p: 2, boxShadow: 5, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={500}>{stat.label}</Typography>
        <Typography variant="h3" color="primary" fontWeight={700}>
          {stat.value}
        </Typography>
      </CardContent>
    </Card>
  </Grid>
))}

          <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "center" }}>
            <Card sx={{ p: 3, boxShadow: 5, borderRadius: 2, width: "100%" }}>
              <CardContent>
                <Typography variant="h6" textAlign="center" fontWeight={500}>
                  Gender Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      label
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default DashboardPage;
