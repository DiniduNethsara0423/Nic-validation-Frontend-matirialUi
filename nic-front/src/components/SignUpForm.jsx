import React from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

const SignUpForm = ({ userData, setUserData, handleSignUp }) => {
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
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        variant="outlined"
        margin="normal"
        required
        value={userData.password}
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 2, py: 1.5, fontSize: "16px", fontWeight: "bold" }}
        onClick={handleSignUp}
      >
        Register & Send OTP
      </Button>
    </Box>
  );
};

export default SignUpForm;
