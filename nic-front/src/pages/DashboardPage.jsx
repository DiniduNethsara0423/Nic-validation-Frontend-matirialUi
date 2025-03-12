import React from "react";
import { Container, Grid2, Typography, Card, CardContent } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

function DashboardPage() {
  const stats = {
    nicCount: 120,
    maleCount: 70,
    femaleCount: 50,
    csvFilesUploaded: 15,
  };

  // Pie Chart Data
  const pieData = [
    { name: "Male", value: stats.maleCount },
    { name: "Female", value: stats.femaleCount },
  ];

  // Colors for Pie 
  const COLORS = ["#42A5F5", "#F48FB1"];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid2 container spacing={3}>
        {/* Statistic Cards */}
        {[
          { label: "Total NIC Count", value: stats.nicCount },
          { label: "Male Count", value: stats.maleCount },
          { label: "Female Count", value: stats.femaleCount },
          { label: "CSV Files Uploaded", value: stats.csvFilesUploaded },
        ].map((stat, index) => (
          <Grid2 item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ textAlign: "center", p: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6">{stat.label}</Typography>
                <Typography variant="h4" color="primary">
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}

        {/* Pie Chart  */}
        <Grid2 item xs={12} md={6}>
          <Card sx={{ p: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" textAlign="center">
                Gender Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </Container>
  );
}

export default DashboardPage;
