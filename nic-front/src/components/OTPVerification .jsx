import React from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

const OTPVerification = ({ otp, setOtp, handleVerifyOTP }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Verify OTP
      </Typography>
      <TextField
        fullWidth
        label="Enter OTP"
        variant="outlined"
        margin="normal"
        required
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        inputProps={{ maxLength: 6 }}
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 2, py: 1.5, fontSize: "16px", fontWeight: "bold" }}
        onClick={handleVerifyOTP}
      >
        Verify OTP
      </Button>
    </Box>
  );
};

export default OTPVerification;
