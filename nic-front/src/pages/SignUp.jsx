import React, { useState } from "react";
import { Box, Card, CardContent, Avatar, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SignUpForm from "../components/SignUpForm";
import OTPVerification from "../components/OTPVerification ";
import AccountSetup from "../components/AccountSetup";

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [form, setForm] = useState({ password: "", confirmPassword: "" });

  const handleSendOTP = () => {
    if (email) {
      // API call to send OTP (simulate success)
      alert(`OTP sent to ${email}`);
      setStep(2);
    } else {
      alert("Enter a valid email!");
    }
  };

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      alert("OTP Verified!");
      setStep(3);
    } else {
      alert("Enter a valid 6-digit OTP!");
    }
  };

  const handleSignUp = () => {
    if (form.password && form.confirmPassword && form.password === form.confirmPassword) {
      alert("Account Created Successfully!");
    } else {
      alert("Passwords do not match!");
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

          {step === 1 && <SignUpForm email={email} setEmail={setEmail} handleSendOTP={handleSendOTP} />}
          {step === 2 && <OTPVerification otp={otp} setOtp={setOtp} handleVerifyOTP={handleVerifyOTP} />}
          {step === 3 && <AccountSetup form={form} setForm={setForm} handleSignUp={handleSignUp} />}
        </CardContent>
      </Card>
    </Box>
  );
};

export default SignUp;
