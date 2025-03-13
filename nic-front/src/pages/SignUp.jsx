import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Card, CardContent, Avatar, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SignUpForm from "../components/SignUpForm";
import OTPVerification from "../components/OTPVerification ";
import Swal from "sweetalert2";

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({ username: "", email: "", password: "" });
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (userData.username && userData.email && userData.password) {
      try {
        const response = await fetch(`http://localhost:8082/api/auth/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });

        const result = await response.text();

        Swal.fire({
          title: response.ok ? "Success!" : "Error",
          text: result,
          icon: response.ok ? "success" : "error",
        });

        if (response.ok) {
          setStep(2);
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Error signing up: " + error.message,
          icon: "error",
        });
      }
    } else {
      Swal.fire({
        title: "Warning",
        text: "All fields are required!",
        icon: "warning",
      });
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length === 6) {
      try {
        const response = await fetch(`http://localhost:8082/api/auth/verify-otp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: userData.email, otp }),
        });

        const result = await response.text();

        Swal.fire({
          title: response.ok ? "Success!" : "Error",
          text: result,
          icon: response.ok ? "success" : "error",
        });

        if (response.ok) {
          Swal.fire({
            title: "OTP Verified!",
            text: "Account setup complete.",
            icon: "success",
          }).then(() => navigate("/"));
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Error verifying OTP: " + error.message,
          icon: "error",
        });
      }
    } else {
      Swal.fire({
        title: "Invalid OTP",
        text: "Enter a valid 6-digit OTP!",
        icon: "warning",
      });
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
              Sign Up
            </Typography>
          </Box>

          {step === 1 && <SignUpForm userData={userData} setUserData={setUserData} handleSignUp={handleSignUp} />}
          {step === 2 && <OTPVerification otp={otp} setOtp={setOtp} handleVerifyOTP={handleVerifyOTP} />}
        </CardContent>
      </Card>
    </Box>
  );
};

export default SignUp;
