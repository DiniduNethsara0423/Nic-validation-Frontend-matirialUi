import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Button,
  Box,
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
import { motion } from "framer-motion";
import CountUp from "react-countup";
import Layout from "./layout";

function DashboardPage() {
  const navigate = useNavigate();
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
    { name: "Male", value: stats.maleCount, color: "#1565C0" },
    { name: "Female", value: stats.femaleCount, color: "#D81B60" },
  ];

  const barData = [
    { category: "Male", count: stats.maleCount },
    { category: "Female", count: stats.femaleCount },
  ];

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <Typography variant="h4" fontWeight={700} textAlign="center" gutterBottom>
            Dashboard Overview
          </Typography>
        </motion.div>

        {loading ? (
          <Grid container justifyContent="center" sx={{ mt: 5 }}>
            <CircularProgress />
          </Grid>
        ) : error ? (
          <Typography color="error" textAlign="center">{error}</Typography>
        ) : (
          <Grid container spacing={3}>
            {[
              { label: "Total NIC Count", value: stats.nicCount, color: "#1E88E5" },
              { label: "Male Count", value: stats.maleCount, color: "#1565C0" },
              { label: "Female Count", value: stats.femaleCount, color: "#D81B60" },
              { label: "Uploaded Files", value: stats.csvFilesUploaded, color: "#F57C00" },
            ].map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                  <Card sx={{ textAlign: "center", p: 2, boxShadow: 3, borderRadius: 2, backgroundColor: stat.color, color: "#fff" }}>
                    <CardContent>
                      <Typography variant="h6" fontWeight={500}>{stat.label}</Typography>
                      <Typography variant="h4" fontWeight={700}>
                        <CountUp start={0} end={stat.value} duration={2} />
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}

            <Grid item xs={12} md={6}>
              <Card sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" textAlign="center">Gender Distribution</Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={70} outerRadius={110} dataKey="value">
                        {pieData.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" textAlign="center">Gender Distribution</Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={barData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" fill="#1E88E5" barSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
          <Button variant="contained" color="primary" onClick={() => navigate("/Chat")}>
            Validate Single NIC
          </Button>
        </Box>
      </Container>
    </Layout>
  );
}

export default DashboardPage;
