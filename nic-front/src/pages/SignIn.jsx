import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
  
    try {
      const response = await axios.post("http://localhost:8082/api/auth/login", {
        email,
        password,
      });
  
      if (response.data.message === "Login successful!") {
        Swal.fire({
          title: "Success!",
          text: response.data.message,
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/dashboard");
        });
      } else {
        Swal.fire({
          title: "Unsuccessful!",
          text: response.data.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: "Invalid email or password. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error("Login failed", err);
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
              Sign In
            </Typography>
          </Box>

          <Box component="form" noValidate sx={{ mt: 2 }} onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email Address"
              variant="outlined"
              margin="normal"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
              <Link
                href="/ForgotPassword"
                variant="body2"
                sx={{
                  textDecoration: "none",
                  color: "primary.main",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Forgot password?
              </Link>
              <Link
                href="/SignUp"
                variant="body2"
                sx={{
                  textDecoration: "none",
                  color: "secondary.main",
                  fontWeight: "bold",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Create New Account
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, py: 1.5, fontSize: "16px", fontWeight: "bold" }}
            >
              Sign In
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SignIn;
