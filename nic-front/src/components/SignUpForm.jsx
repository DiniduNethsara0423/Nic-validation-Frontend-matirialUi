import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

const SignUpForm = ({ userData, setUserData, handleSignUp }) => {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

 
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setUserData({ ...userData, email });

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setUserData({ ...userData, password });

    if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character."
      );
    } else {
      setPasswordError("");
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Register
      </Typography>
      <TextField
        fullWidth
        label="Username"
        variant="outlined"
        margin="normal"
        required
        value={userData.username}
        onChange={(e) => setUserData({ ...userData, username: e.target.value })}
      />
      <TextField
        fullWidth
        label="Email Address"
        type="email"
        variant="outlined"
        margin="normal"
        required
        value={userData.email}
        onChange={handleEmailChange}
        error={!!emailError}
        helperText={emailError}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        variant="outlined"
        margin="normal"
        required
        value={userData.password}
        onChange={handlePasswordChange}
        error={!!passwordError}
        helperText={passwordError}
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 2, py: 1.5, fontSize: "16px", fontWeight: "bold" }}
        onClick={handleSignUp}
        disabled={!!emailError || !!passwordError} 
      >
        Register & Send OTP
      </Button>
    </Box>
  );
};

export default SignUpForm;
