import { useTheme } from "@emotion/react";
import { ConnectedTvOutlined } from "@mui/icons-material";
import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../firebase/Auth";

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [showmsg, setShowMsg] = useState(0);
  async function login(event) {
    event.preventDefault();
    setShowMsg(0);
    const [email, password] = event.target;
    try {
      await signIn(email.value, document.getElementById("password").value);
      navigate("/");
    } catch (err) {
      setShowMsg(1);
    }
  }

  return (
    <Container component={"main"} maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          mt: theme.spacing(8),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar sx={{ m: 1, backgroundColor: theme.palette.secondary.main }}>
          <LockOutlined />
        </Avatar>

        <Typography component={"h1"} variant="h5">
          Sign In
        </Typography>

        <form sx={{ width: "100%", mt: 1 }} onSubmit={login}>
          <TextField
            label="E-mail"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            type="email"
            autoFocus
          />
          <TextField
            label="Password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            name="password"
            type="password"
            // autoComplete="current-password"
          />
        <Typography component={"h6"} variant="paragraph" sx={{color:"red"}}>
          {showmsg?"Wrong Credentials":""}
        </Typography>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            color="primary"
            sx={{
              margin: theme.spacing(3, 0, 2),
            }}
          >
            Sign In
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
