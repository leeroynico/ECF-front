import React, { useState, useEffect } from "react";
import { TextField, Grid, Typography, Button, Paper } from "@mui/material";
import { url, jwt } from "../axios";
import { escapeHtml } from "../FonctionsRandomPassword";

const axios = require("axios");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

function CreateOfficine() {
  const center = { display: "flex", justifyContent: "center" };
  const [libelle, setLibelle] = useState("");
  const [identifiant, setIdentifiant] = useState("");
  const password = Math.random().toString(24).slice(-10);
  const [adresse, setAdresse] = useState(null);
  const [ville, setVille] = useState("");
  const [telephone, setTelephone] = useState("");
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [nombreCF, setNombreCF] = useState(0);

  const generateOfficineId = () => {
    let identifiant =
      utilisateurs.length === 0
        ? "identifiant"
        : "PHARMA - 62 -" + (lastId + 1);
    setIdentifiant(identifiant);
  };

  const [lastId, setLastId] = useState(0);
  useEffect(() => {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
      axios.get(url.officines).then(function (response) {
        if (response.status != 200) {
          alert("problème de chargement de data");
        }
        setUtilisateurs(response.data["hydra:member"]);
        setLastId(
          Math.max(...response.data["hydra:member"].map((item) => item.id))
        );
      });
    } catch (e) {
      console.log("erreur axios : " + e);
    }
    generateOfficineId();
  }, [libelle]);

  // création dans la bdd officine + chambre froide

  const create = async (e) => {
    if (adresse !== "" && ville !== "") {
      //create officine
      let idOff = "";
      try {
        axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
        await axios({
          method: "post",
          url: url.officines,
          data: {
            libelle: libelle,
            adresse: adresse + "-" + ville,
            telephone: telephone,
            password: bcrypt.hashSync(password, salt),
            customIdentifiant: identifiant,
          },
        }).then((responseOfficine) => {
          idOff = responseOfficine.data["@id"];
        });
        if (nombreCF > 0) {
          for (let i = 0; i < nombreCF; i++) {
            await axios({
              method: "post",
              timout: 100,
              url: url.chambreFroides,
              data: {
                libell: "chambre - " + (i + 1),
                officine: idOff,
              },
            });
          }
        }
      } catch (error) {
        console.log("post officines erreur : ", error);
      }
      alert(
        `veuillez noter le mot de passe pour ${identifiant} : ${password} (pour vous connecter ultérieurement)`
      );
      window.location.reload();
    } else {
      alert("veuillez remplir les champs svp ");
    }
  };

  //modèle d'input pour le formulaire
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
          onChange={(e) => setState(escapeHtml(e.target.value))}
          disabled={desactive ? true : false}
        />
      </Grid>
    );
  };

  //génération des chambres froides selon leur nombre
  let arrayInputCB = [];
  for (let i = 0; i < nombreCF; i++) {
    arrayInputCB.push(inputMui("chambre - " + (i + 1), "", 12, true));
  }

  return (
    <>
      <Paper
        sx={{
          marginTop: 2,
          backgroundColor: "#BABFD180",
          borderRadius: 10,
        }}
      >
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h3" sx={{ marginBottom: 1 }} align="center">
              crééer une officine
            </Typography>
          </Grid>
          {inputMui("libelle", setLibelle, 12)}
          {inputMui("adresse postale", setAdresse, 12)}
          {inputMui("ville", setVille)}
          {inputMui("telephonne", setTelephone)}
          {inputMui(identifiant, "", 6, true)}
          {/*  {inputMui(password, "", 6, true)} */}
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
