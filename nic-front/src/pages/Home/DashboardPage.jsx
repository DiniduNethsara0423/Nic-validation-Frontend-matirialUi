import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import Layout from "./layout";

function DashboardPage() {
  const [stats, setStats] = useState({
    nicCount: 0,
    maleCount: 0,
    femaleCount: 0,
    csvFilesUploaded: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

        setStats({
          nicCount: responses[0].data,
          maleCount: responses[1].data,
          femaleCount: responses[2].data,
          csvFilesUploaded: responses[3].data,
        });

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

  const barData = [
    { category: "Male", count: stats.maleCount },
    { category: "Female", count: stats.femaleCount },
  ];

  const COLORS = ["#1E88E5", "#D81B60"];

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ mt: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom fontWeight={700} textAlign="center">
          Dashboard Overview
        </Typography>

        {loading ? (
          <Grid container justifyContent="center" sx={{ mt: 5 }}>
            <CircularProgress />
          </Grid>
        ) : error ? (
          <Typography color="error" textAlign="center">
            {error}
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {/* Stats Cards */}
            {[
              { label: "Total NIC Count", value: stats.nicCount },
              { label: "Male Count", value: stats.maleCount },
              { label: "Female Count", value: stats.femaleCount },
              { label: "Uploaded Files", value: stats.csvFilesUploaded },
            ].map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    textAlign: "center",
                    p: 2,
                    boxShadow: 2,
                    borderRadius: 2,
                    background: "#F9F9F9",
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" fontWeight={500} color="textSecondary">
                      {stat.label}
                    </Typography>
                    <Typography variant="h4" color="primary" fontWeight={700}>
                      {stat.value}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}

            {/* Pie Chart */}
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 2, boxShadow: 2, borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" textAlign="center" fontWeight={500}>
                    Gender Distribution (Pie Chart)
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        outerRadius={110}
                        dataKey="value"
                        label
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={index} fill={COLORS[index]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend verticalAlign="bottom" height={30} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

            {/* Bar Chart */}
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 2, boxShadow: 2, borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" textAlign="center" fontWeight={500}>
                    Gender Distribution (Bar Chart)
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={barData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" fill="#1E88E5" name="Count" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </Layout>
  );
}

export default DashboardPage;
