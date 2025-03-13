import React, { useState } from "react";
import { Box, Card, CardContent, Avatar, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SignUpForm from "../components/SignUpForm";
import OTPVerification from "../components/OTPVerification ";

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({ username: "", email: "", password: "" });
  const [otp, setOtp] = useState("");

  const handleSignUp = async () => {
    if (userData.username && userData.email && userData.password) {
      try {
        const response = await fetch(`http://localhost:8082/api/auth/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });

        const result = await response.text();
        alert(result);

        if (response.ok) {
          setStep(2); // Move to OTP verification step
        }
      } catch (error) {
        alert("Error signing up: " + error.message);
      }
    } else {
      alert("All fields are required!");
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
        alert(result);

        if (response.ok) {
          alert("OTP Verified! Account setup complete.");
        }
      } catch (error) {
        alert("Error verifying OTP: " + error.message);
      }
    } else {
      alert("Enter a valid 6-digit OTP!");
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
