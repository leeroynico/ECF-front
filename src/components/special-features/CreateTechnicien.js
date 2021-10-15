import React from "react";
import { useState } from "react";
import {
  TextField,
  Grid,
  Typography,
  Button,
  Paper,
  Slider,
} from "@mui/material";
import { getRandom } from "../FonctionsRandom";
import { url, axiosPost } from "../axios";

const axios = require("axios");
//const urlApi = "https://api-projet-ecf.herokuapp.com/api/utilisateurs";
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(2);
const hash = bcrypt.hashSync(getRandom(1, 10).toString(), salt).slice(25);

function CreateOfficine() {
  const center = { display: "flex", justifyContent: "center" };
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const data = {
    nom: nom,
    prenom: prenom,
    password: "string",
    telephone: telephone,
    role: "technicien",
  };

  const create = () => {
    if (adresse != "" && ville != "") {
      // axios({
      //   method: "post",
      //   url: urlApi,
      //   data: {
      //     nom: "marie",
      //     prenom: "jesus",
      //     password: "string",
      //     role: "technicien",
      //   },
      // });
      axiosPost(url.utilisateurs, data);
      window.location.reload();
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
          onChange={(e) => setState(e.target.value)}
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
          // color: "#DA5552",
        }}
      >
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" align="center">
              crééer une officine
            </Typography>
          </Grid>
          {inputMui("identifiant")}
          {inputMui("password")}
          {inputMui("adresse postale", setAdresse, 12)}
          {inputMui("ville", setVille)}
          {inputMui("telephonne", setTelephone)}
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
              créer
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default CreateOfficine;
