import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./Header";
import { Outlet } from "react-router-dom";
const theme = createTheme({
  palette: {
    mode: "light",
  },
});
const Layout = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <main>
        <Outlet />
      </main>
      <footer> </footer>
    </ThemeProvider>
  );
};

export default Layout;
