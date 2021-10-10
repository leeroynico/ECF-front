import React from "react";
import "./loginStyle.css";
import {
  TextField,
  Grid,
  Typography,
  Button,
  Paper,
  Divider,
} from "@mui/material";
import LoginData from "./LoginData";

function Login() {
  const connect = (e) => {
    e.preventDefault();
    localStorage.setItem("role", "admin");
    window.location.pathname = "/home";
    // localStorage.clear();
  };
  //TODO => changer couleur des inputs de Mui pour coller à la charte
  return (
    <>
      <Paper
        sx={{
          marginTop: 10,
          mx: 2,
          p: 3,
          backgroundColor: "#BABFD180",
          color: "#DA5552",
        }}
      >
        <Grid
          container
          spacing={4}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <Typography>
              Entrez votre identifiant et votre mot de passe{" "}
            </Typography>
          </Grid>
          <Grid item>
            <TextField id="loginId" label="identifiant" variant="outlined" />
          </Grid>

          <Grid item>
            <TextField
              id="loginPassword"
              label="mot de passe"
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={connect}
              sx={{ backgroundColor: "#DF7373" }}
            >
              se connecter
            </Button>
          </Grid>
          <LoginData />
        </Grid>
      </Paper>
    </>
  );
}

export default Login;
