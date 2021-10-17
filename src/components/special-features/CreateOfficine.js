import React, { useState, useEffect } from "react";
import {
  TextField,
  Grid,
  Typography,
  Button,
  Paper,
  Slider,
} from "@mui/material";
import { url, roles, axiosGet } from "../axios";

const axios = require("axios");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(2);
//const hash = bcrypt.hashSync(getRandom(1, 10).toString(), salt).slice(25);

function CreateOfficine() {
  const center = { display: "flex", justifyContent: "center" };
  const [adresse, setAdresse] = useState("");
  const [ville, setVille] = useState("");
  const [telephone, setTelephone] = useState("");
  const [initialValue, setInitialValue] = useState("");
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [nombreCF, setNombreCF] = useState(0);

  const generateOfficineId = (id) => {
    return "PHARMA - 62" + id;
  };
  useEffect(() => {
    axiosGet(url.officines, setUtilisateurs);
  }, [adresse]);
  console.log(utilisateurs);

  const create = (e) => {
    if (adresse != "" && ville != "") {
      setInitialValue("");
      axios({
        method: "post",
        url: url.officines,
        data: {
          libelle: "test",
          adresse: adresse + "-" + ville,
          telephone: telephone,
          password: "passordtest",
          role: roles.officine,
        },
      });
      window.location.reload();
    } else {
      alert("veuillez remplir les champs svp ");
    }
  };

  const inputMui = (label, setState, w = 6, desactive = false) => {
    return (
      <Grid item xs={w} sx={center}>
        <TextField
          sx={{ width: w > 6 ? "90%" : "80%" }}
          label={label}
          variant="outlined"
          type={
            label === "password"
              ? "password"
              : label === "nombre chambre froide"
              ? "number"
              : ""
          }
          onChange={(e) => setState(e.target.value)}
          disabled={desactive ? true : false}
        />
      </Grid>
    );
  };
  let inputCB = inputMui("chambre", "", 12, true);
  let arrayInputCB = [];
  for (let i = 0; i < nombreCF; i++) {
    arrayInputCB.push(inputMui("chambre - " + i, "", 12, true));
  }

  return (
    <>
      <Paper
        sx={{
          marginTop: 10,
          backgroundColor: "#BABFD180",
          borderRadius: 5,
          // color: "#DA5552",
        }}
      >
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" align="center">
              crééer une officine
            </Typography>
          </Grid>
          {inputMui("adresse postale", setAdresse, 12)}
          {inputMui("ville", setVille)}
          {inputMui("telephonne", setTelephone)}
          {inputMui("identifiant", "", 6, true)}
          {inputMui("password", "", 6, true)}
          {inputMui("nombre chambre froide", setNombreCF, 8)}
          {arrayInputCB.map((input, i) => (
            <span key={i} style={{ marginTop: "10px" }}>
              {input}
            </span>
          ))}
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
