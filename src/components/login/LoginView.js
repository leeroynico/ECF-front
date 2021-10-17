import React from "react";
import { TextField, Grid, Typography, Button, Paper } from "@mui/material";

function Login(props) {
  return (
    <>
      <Paper
        sx={{
          marginTop: 10,
          mx: 2,
          p: 3,
          backgroundColor: "#BABFD180",
          borderRadius: 5,
        }}
      >
        <Grid
          container
          spacing={4}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={10}>
            <Typography paragraph variant="h5" align="center">
              SE CONNECTER
            </Typography>
            <Typography variant="body1">
              Entrez votre identifiant et votre mot de passe
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
              id="loginId"
              label="identifiant"
              variant="outlined"
              onChange={(e) => props.setIdentifiant(e.target.value)}
            />
          </Grid>
          <Grid item xs={10}>
            <TextField
              type="password"
              id="loginPassword"
              label="mot de passe"
              variant="outlined"
              onChange={(e) => {
                props.setPassword(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={10}>
            <Button
              variant="contained"
              onClick={props.connect}
              sx={{ backgroundColor: "#DF7373" }}
            >
              se connecter
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default Login;
