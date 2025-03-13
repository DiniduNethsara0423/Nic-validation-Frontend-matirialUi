import React from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

const SignUpForm = ({ email, setEmail, handleSendOTP }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Enter Email
      </Typography>
      <TextField
        fullWidth
        label="Email Address"
        variant="outlined"
        margin="normal"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 2, py: 1.5, fontSize: "16px", fontWeight: "bold" }}
        onClick={handleSendOTP}
      >
        Send OTP
      </Button>
    </Box>
  );
};

export default SignUpForm;
