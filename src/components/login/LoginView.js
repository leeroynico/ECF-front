import React from "react";
import "./loginStyle.css";
import { TextField, Grid, Typography } from "@mui/material";
import LoginData from "./LoginData";

function Login() {
  return (
    <>
      <Grid
        sx={{ marginTop: 5 }}
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h4" component="h2">
          TD temp
        </Typography>
        <TextField
          id="loginId"
          label="identifiant"
          variant="outlined"
          onKeyUp={alert("yo")}
        />
        <TextField id="loginPassword" label="mot de passe" variant="outlined" />
        <LoginData />
      </Grid>
    </>
  );
}

export default Login;
