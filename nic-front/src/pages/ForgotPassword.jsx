import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Box,
  Card,
  CardContent,
  Avatar,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [form, setForm] = useState({ newPassword: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Email Validation
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Password Validation
  const isValidPassword = (password) => {
    return password.length >= 6;
  };

  const handleSendOTP = async () => {
    if (!isValidEmail(email)) {
      Swal.fire("Invalid Email!", "Please enter a valid email address.", "error");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:8082/api/auth/send-otp/${email}`);
      if (response.data === "Email not found!") {
        Swal.fire("Error", response.data, "error");
      } else if (response.data === "OTP sent successfully!") {
        Swal.fire("Success", response.data, "success").then(() => setStep(2));
      }
    } catch (error) {
      Swal.fire("Error", "Failed to send OTP. Try again!", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = () => {
    if (otp.length !== 6) {
      Swal.fire("Invalid OTP!", "Enter a valid 6-digit OTP.", "error");
      return;
    }
    setStep(3);
  };

  const handleResetPassword = async () => {
    if (!isValidPassword(form.newPassword)) {
      Swal.fire("Weak Password", "Password must be at least 6 characters long.", "error");
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      Swal.fire("Passwords do not match!", "Make sure both passwords match.", "error");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8082/api/auth/reset-password", {
        email,
        otp,
        newPassword: form.newPassword,
      });

      if (response.data === "Invalid OTP!" || response.data === "OTP is invalid or has expired!") {
        Swal.fire("Error", response.data, "error");
      } else if (response.data === "Password reset successfully!") {
        Swal.fire("Success", response.data, "success").then(() => navigate("/"));
      }
    } catch (error) {
      Swal.fire("Error", "Failed to reset password. Try again!", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f8fafc, #e0f2f1)",
        padding: 2,
      }}
    >
      <Card sx={{ width: "90%", maxWidth: 420, padding: 4, boxShadow: 4, borderRadius: 3, bgcolor: "white" }}>
        <CardContent>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Avatar sx={{ bgcolor: "primary.main", mb: 2 }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5" fontWeight="bold" color="primary">
              Forgot Password
            </Typography>
          </Box>

          <Stepper activeStep={step - 1} alternativeLabel sx={{ my: 2 }}>
            {["Enter Email", "Enter OTP", "Reset Password"].map((label, index) => (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {step === 1 && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={email !== "" && !isValidEmail(email)}
                helperText={email !== "" && !isValidEmail(email) ? "Enter a valid email address" : ""}
              />
              <Button variant="contained" color="primary" onClick={handleSendOTP} disabled={loading}>
                {loading ? <CircularProgress size={24} color="inherit" /> : "Send OTP"}
              </Button>
            </Box>
          )}

          {step === 2 && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="OTP"
                variant="outlined"
                fullWidth
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                error={otp !== "" && otp.length !== 6}
                helperText={otp !== "" && otp.length !== 6 ? "OTP must be 6 digits" : ""}
              />
              <Button variant="contained" color="primary" onClick={handleVerifyOTP}>
                Verify OTP
              </Button>
            </Box>
          )}

          {step === 3 && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="New Password"
                variant="outlined"
                type="password"
                fullWidth
                value={form.newPassword}
                onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                error={form.newPassword !== "" && !isValidPassword(form.newPassword)}
                helperText={form.newPassword !== "" && !isValidPassword(form.newPassword) ? "At least 6 characters" : ""}
              />
              <TextField
                label="Confirm Password"
                variant="outlined"
                type="password"
                fullWidth
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                error={form.confirmPassword !== "" && form.newPassword !== form.confirmPassword}
                helperText={form.confirmPassword !== "" && form.newPassword !== form.confirmPassword ? "Passwords do not match" : ""}
              />
              <Button variant="contained" color="success" onClick={handleResetPassword} disabled={loading}>
                {loading ? <CircularProgress size={24} color="inherit" /> : "Reset Password"}
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ForgotPassword;
