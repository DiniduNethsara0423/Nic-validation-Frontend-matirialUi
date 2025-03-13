import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Card, CardContent, Avatar, Typography, TextField, Button, Alert, CircularProgress } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [form, setForm] = useState({ newPassword: "", confirmPassword: "" });
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    if (!email) {
      setAlertMessage("Enter a valid email!");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:8082/api/auth/send-otp/${email}`);
      setAlertMessage(response.data.message || `OTP sent to ${email}`);
      setStep(2);
    } catch (error) {
      setAlertMessage(error.response?.data?.message || "Failed to send OTP. Try again!");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      setAlertMessage("OTP Verified!");
      setStep(3);
    } else {
      setAlertMessage("Enter a valid 6-digit OTP!");
    }
  };

  const handleResetPassword = async () => {
    if (!form.newPassword || !form.confirmPassword || form.newPassword !== form.confirmPassword) {
      setAlertMessage("Passwords do not match!");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8082/api/auth/reset-password", {
        email,
        otp,
        newPassword: form.newPassword,
      });
      if (response.data.message === "Password reset successfully!") {
        navigate("/dashboard");
      } else {
        setAlertMessage(response.data.message || "Password reset successful!");
      }
    } catch (error) {
      setAlertMessage(error.response?.data?.message || "Failed to reset password. Try again!");
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
      <Card sx={{ padding: 4, width: "100%", maxWidth: 400, boxShadow: 4, borderRadius: 3, bgcolor: "white" }}>
        <CardContent>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Avatar sx={{ bgcolor: "primary.main", mb: 2 }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5" gutterBottom fontWeight="bold" color="primary">
              Forgot Password
            </Typography>
          </Box>

          {alertMessage && <Alert severity="info" sx={{ mb: 2 }}>{alertMessage}</Alert>}

          {step === 1 && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField label="Email" variant="outlined" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
              <Button variant="contained" color="primary" onClick={handleSendOTP} disabled={loading}>
                {loading ? <CircularProgress size={24} color="inherit" /> : "Send OTP"}
              </Button>
            </Box>
          )}

          {step === 2 && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField label="OTP" variant="outlined" fullWidth value={otp} onChange={(e) => setOtp(e.target.value)} />
              <Button variant="contained" color="primary" onClick={handleVerifyOTP}>
                Verify OTP
              </Button>
            </Box>
          )}

          {step === 3 && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField label="New Password" variant="outlined" type="password" fullWidth value={form.newPassword} onChange={(e) => setForm({ ...form, newPassword: e.target.value })} />
              <TextField label="Re-enter Password" variant="outlined" type="password" fullWidth value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} />
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