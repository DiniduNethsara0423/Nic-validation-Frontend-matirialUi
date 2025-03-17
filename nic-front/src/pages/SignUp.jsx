import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Card, CardContent, Avatar, Typography, TextField, Button } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Swal from "sweetalert2";

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({ username: "", email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });

    if (name === "email") {
      setErrors({ ...errors, email: emailRegex.test(value) ? "" : "Invalid email format" });
    }
    if (name === "password") {
      setErrors({
        ...errors,
        password: passwordRegex.test(value)
          ? ""
          : "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
      });
    }
  };

  const handleSignUp = async () => {
    if (!userData.username || !userData.email || !userData.password) {
      Swal.fire({
        title: "Warning",
        text: "All fields are required!",
        icon: "warning",
      });
      return;
    }

    if (errors.email || errors.password) {
      Swal.fire({
        title: "Error",
        text: "Please fix the validation errors!",
        icon: "error",
      });
      return;
    }

    try {
      const response = await fetch(`http://localhost:8082/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const result = await response.text();

      if (result === "Email already registered!") {
        Swal.fire({
          title: "Error",
          text: result,
          icon: "error",
          confirmButtonText: "Go to Forgot Password",
        }).then(() => {
          window.location.href = "/ForgotPassword";
        });
        return;
      }

      if (result === "User registered. Please verify OTP sent to your email.") {
        Swal.fire({ title: "Success!", text: result, icon: "success" });
        setStep(2);
        return;
      }

      Swal.fire({ title: "Error", text: result, icon: "error" });
    } catch (error) {
      Swal.fire({ title: "Error", text: "Error signing up: " + error.message, icon: "error" });
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      Swal.fire({ title: "Invalid OTP", text: "Enter a valid 6-digit OTP!", icon: "warning" });
      return;
    }

    try {
      const response = await fetch(`http://localhost:8082/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userData.email, otp }),
      });

      const result = await response.text();

      if (result === "Invalid OTP!") {
        Swal.fire({ title: "Error", text: result, icon: "error" });
        return;
      }

      if (result === "Email verified successfully!") {
        Swal.fire({ title: "Success!", text: result, icon: "success" }).then(() => navigate("/"));
      } else {
        Swal.fire({ title: "Error", text: result, icon: "error" });
      }
    } catch (error) {
      Swal.fire({ title: "Error", text: "Error verifying OTP: " + error.message, icon: "error" });
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
      <Card
        sx={{
          padding: 4,
          width: "100%",
          maxWidth: 400,
          boxShadow: 4,
          borderRadius: 3,
          bgcolor: "white",
        }}
      >
        <CardContent>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Avatar sx={{ bgcolor: "primary.main", mb: 2 }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5" gutterBottom fontWeight="bold" color="primary">
              {step === 1 ? "Sign Up" : "Verify OTP"}
            </Typography>
          </Box>

          {step === 1 && (
            <>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={userData.username}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                margin="normal"
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={userData.password}
                onChange={handleChange}
                margin="normal"
                error={Boolean(errors.password)}
                helperText={errors.password}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSignUp}
                sx={{ mt: 2 }}
              >
                Sign Up
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <TextField
                fullWidth
                label="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                margin="normal"
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleVerifyOTP}
                sx={{ mt: 2 }}
              >
                Verify OTP
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default SignUp;
