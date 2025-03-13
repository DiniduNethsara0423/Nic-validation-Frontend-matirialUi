import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Box,
  Typography,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Navigation items
  const navItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Upload CSV", path: "/upload" },
    { label: "Generate Reports", path: "/reports" },
    { label: "Show All NICs", path: "/nics" },
    { label: "Search by File Name", path: "/search" },
  ];

  const currentTab = navItems.findIndex((item) => item.path === location.pathname);

  // Drawer State for Mobile
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  // Handle Logout
  const handleLogout = () => {
    // Clear user session (if needed)
    navigate("/");
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "linear-gradient(90deg, #0d47a1, #1976d2)",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
      }}
    >
      <Toolbar>
        {/* Mobile Menu Button */}
        {isMobile && (
          <IconButton edge="start" color="inherit" onClick={toggleDrawer} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
        )}

        {/* App Name / Logo */}
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold", letterSpacing: 1 }}>
          NIC Validator
        </Typography>

        {/* Desktop Navigation Tabs */}
        {!isMobile && (
          <Tabs
            value={currentTab !== -1 ? currentTab : false}
            textColor="inherit"
            sx={{
              "& .MuiTab-root": {
                fontSize: "1rem",
                textTransform: "none",
                fontWeight: "500",
                transition: "0.3s",
              },
              "& .MuiTab-root:hover": {
                color: "#ffeb3b",
              },
            }}
          >
            {navItems.map((item, index) => (
              <Tab key={index} label={item.label} component={Link} to={item.path} />
            ))}
          </Tabs>
        )}

        {/* Logout Button */}
        {!isMobile && (
          <Button
            onClick={handleLogout}
            variant="contained"
            color="error"
            sx={{
              ml: 2,
              textTransform: "none",
              fontWeight: "bold",
              borderRadius: "8px",
              boxShadow: "0px 3px 6px rgba(0,0,0,0.2)",
            }}
            startIcon={<ExitToAppIcon />}
          >
            Logout
          </Button>
        )}
      </Toolbar>

      {/* Mobile Drawer (Sidebar) */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 250, paddingTop: 2 }}>
          <List>
            {navItems.map((item, index) => (
              <ListItem button key={index} component={Link} to={item.path} onClick={toggleDrawer}>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
            {/* Mobile Logout */}
            <ListItem button onClick={handleLogout}>
              <ExitToAppIcon sx={{ mr: 1 }} />
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
