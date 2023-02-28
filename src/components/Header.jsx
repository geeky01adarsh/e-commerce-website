import { Toolbar, Typography, AppBar, IconButton, Badge, Box, Button } from "@mui/material";
import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
const Header = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
          eComm
        </Typography>
        <Box sx={{display:{xs:"none", md: "flex"}}}>
          <IconButton size="large" aria-label="app icon" color="inherit">
            <Badge badgeContent={1} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
              </Box>
              <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
