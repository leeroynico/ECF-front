import React from "react";
import { useState } from "react";
import { TextField, Grid, Typography, Button, Paper } from "@mui/material";
import { url, roles, jwt } from "../axios";
import { escapeHtml } from "../FonctionsRandomPassword";

const axios = require("axios");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

function CreateOfficine() {
  const center = { display: "flex", justifyContent: "center" };
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [password, setPassword] = useState("");

  const create = () => {
    if (nom !== "" && prenom !== "" && password !== "") {
      axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
      axios({
        method: "post",
        url: url.utilisateurs,
        data: {
          nom: nom,
          prenom: prenom,
          password: bcrypt.hashSync(password, salt),
          role: roles.technicien,
        },
      })
        .then((response) =>
          console.log("create technicien response : ", response)
        )
        .catch((error) => console.log(error));
    }
  };

  const inputMui = (label, setState, w = 6) => {
    return (
      <Grid item xs={w} sx={center}>
        <TextField
          sx={{ width: w > 6 ? "90%" : "80%" }}
          id="loginId"
          label={label}
          variant="outlined"
          type={label === "password" ? "password" : ""}
          onChange={(e) => setState(escapeHtml(e.target.value))}
        />
      </Grid>
    );
  };

  return (
    <>
      <Paper
        sx={{
          marginTop: 10,
          backgroundColor: "#BABFD180",
          borderRadius: 10,
        }}
      >
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ marginBottom: 1 }} align="center">
              crééer un technicien
            </Typography>
          </Grid>
          {inputMui("nom", setNom)}
          {inputMui("prenom", setPrenom)}
          {inputMui("password", setPassword)}
          <Grid
            item
            xs={10}
            sx={{
              marginBottom: 2,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              onClick={create}
              sx={{ backgroundColor: "#DF7373", width: "60%" }}
            >
              créer technicien
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default CreateOfficine;
