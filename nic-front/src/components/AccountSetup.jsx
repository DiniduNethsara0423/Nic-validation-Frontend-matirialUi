  import React from "react";
  import { TextField, Button, Box, Typography } from "@mui/material";

  const AccountSetup = ({ form, setForm, handleSignUp }) => {
    return (
      <Box sx={{ width: "100%" }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Account Setup
        </Typography>
        <TextField
          fullWidth
          label="Email"
          type="email"
          variant="outlined"
          margin="normal"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          required
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          variant="outlined"
          margin="normal"
          required
          value={form.confirmPassword}
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2, py: 1.5, fontSize: "16px", fontWeight: "bold" }}
          onClick={handleSignUp}
        >
          Create Account
        </Button>
      </Box>
    );
  };

  export default AccountSetup;
