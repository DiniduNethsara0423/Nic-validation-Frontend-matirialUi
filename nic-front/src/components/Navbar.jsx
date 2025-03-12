import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Navigation items
  const navItems = [
    { label: "Dashboard", path: "/" },
    { label: "Upload CSV", path: "/upload" },
    { label: "Generate Reports", path: "/reports" },
    { label: "Show All NICs", path: "/nics" },
    { label: "Search by File Name", path: "/search" },
  ];

  const currentTab = navItems.findIndex((item) => item.path === location.pathname);

  // Drawer State for Mobile
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar>
        {/* Mobile Menu Button */}
        {isMobile && (
          <IconButton edge="start" color="inherit" onClick={toggleDrawer} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
        )}

        {/* App Name / Logo */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My App
        </Typography>

        {/* Desktop Navigation Tabs */}
        {!isMobile && (
          <Tabs value={currentTab !== -1 ? currentTab : false} textColor="inherit">
            {navItems.map((item, index) => (
              <Tab key={index} label={item.label} component={Link} to={item.path} />
            ))}
          </Tabs>
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
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
