import React, { useState } from "react";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import Layout from "./layout";


function NicValidator() {
  const [nic, setNic] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    setLoading(true);
    setTimeout(() => {
      const validatedData = validateNic(nic);
      setResponse(validatedData || { error: "Invalid NIC number." });
      setLoading(false);
    }, 1000);
  };

  function validateNic(nic) {
    let gender = "MALE";
    let birthYear, dayValue;

    if (/^\d{12}$/.test(nic)) {
      birthYear = parseInt(nic.substring(0, 4));
      dayValue = parseInt(nic.substring(4, 7));
    } else if (/^\d{9}[VXvx]$/.test(nic)) {
      birthYear = 1900 + parseInt(nic.substring(0, 2));
      dayValue = parseInt(nic.substring(2, 5));
    } else {
      return null;
    }

    if (dayValue > 500) {
      gender = "FEMALE";
      dayValue -= 500;
    }

    let month = 0,
      day = 0;
    const daysInMonth = [0, 31, 29, 31, 30, 31, 30, 31, 30, 31, 30, 31];
    let daysAccumulated = 0;
    for (let i = 1; i <= 12; i++) {
      if (dayValue <= daysAccumulated + daysInMonth[i]) {
        month = i;
        day = dayValue - daysAccumulated;
        break;
      }
      daysAccumulated += daysInMonth[i];
    }

    const isLeapYear =
      (birthYear % 4 === 0 && birthYear % 100 !== 0) || birthYear % 400 === 0;
    if (month === 2 && day === 29 && !isLeapYear) {
      month = 3;
      day = 1;
    }

    const birthDate = new Date(birthYear, month - 1, day);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return {
      nicNumber: nic,
      age: age,
      gender: gender,
      birthday: birthDate.toISOString().split("T")[0],
    };
  }

  return (
    <Layout>
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Box
        p={3}
        sx={{
          maxWidth: 400,
          mx: "auto",
          textAlign: "center",
        }}
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            NIC Validator
          </Typography>
        </motion.div>

        <TextField
          label="Enter NIC Number"
          value={nic}
          onChange={(e) => setNic(e.target.value)}
          fullWidth
          variant="outlined"
          margin="normal"
          sx={{ backgroundColor: "#f9f9f9", borderRadius: 1 }}
        />

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleSend}
            sx={{ mt: 2, width: "100%" }}
          >
            {loading ? "Processing..." : "Validate"}
          </Button>
        </motion.div>

        {response && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Paper sx={{ mt: 3, p: 2, backgroundColor: "#f5f5f5" }}>
              {response.error ? (
                <Typography color="error" fontWeight="bold">
                  {response.error}
                </Typography>
              ) : (
                <Typography>
                  <strong>NIC Number:</strong> {response.nicNumber}
                  <br />
                  <strong>Age:</strong> {response.age}
                  <br />
                  <strong>Gender:</strong> {response.gender}
                  <br />
                  <strong>Birthday:</strong> {response.birthday}
                </Typography>
              )}
            </Paper>
          </motion.div>
        )}
      </Box>
    </motion.div>
    </Layout>
  );
}

export default NicValidator;
