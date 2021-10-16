import React from "react";
import { useState } from "react";
import "./loginStyle.css";
import {
  TextField,
  Grid,
  Typography,
  Button,
  Paper,
  Divider,
} from "@mui/material";
const bcrypt = require("bcryptjs");
let salt = bcrypt.genSaltSync(10);

function Login(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const user = props.users.filter((item) => item.nom === userName);
  console.log(user);
  const connect = (e) => {
    e.preventDefault();
    if (
      userName === user[0].nom &&
      bcrypt.compareSync(password, props.users[0].password)
    ) {
      window.location.pathname = "/home";
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("role", user[0].role);
    }
    //  localStorage.setItem("role", "admin");
    // localStorage.clear();
  };
  //TODO => changer couleur des inputs de Mui pour coller à la charte
  //TODO => identifiant dans toutes les tables

  return (
    <>
      <Paper
        sx={{
          marginTop: 10,
          mx: 2,
          p: 3,
          backgroundColor: "#BABFD180",
          borderRadius: 20,
          // color: "#DA5552",
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
              Entrez votre identifiant (ou votre nom) et votre mot de passe
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              id="loginId"
              label="identifiant"
              variant="outlined"
              onChange={(e) => setUserName(e.target.value)}
            />
          </Grid>

          <Grid item>
            <TextField
              type="password"
              id="loginPassword"
              label="mot de passe"
              variant="outlined"
              // onChange={(e) => {
              //   setPassword(bcrypt.hashSync(e.target.value, salt));
              // }}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
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
        </Grid>
      </Paper>
    </>
  );
}

export default Login;
