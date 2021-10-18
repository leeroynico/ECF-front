import React from "react";
import { useState, useEffect } from "react";
import { CSVReader } from "react-papaparse";
import { Button, Typography, Grid, Paper, Alert } from "@mui/material";
import SelectOfficine from "../special-features/SelectOfficine";
import SelectChambreFroide from "../special-features/SelectChambreFroide";
import { url, axiosGet } from "../axios";

const axios = require("axios");

function CsvImport() {
  const [datasTemperature, setDatasTemperatures] = useState([]);
  const [datasHygrometrie, setDatasHygrometrie] = useState([]);
  const [date, setDate] = useState("");
  const [officine, setOfficine] = useState("");
  const [chambreFroide, setChambreFroide] = useState("");
  const [authorizeDownload, setAuthorizeDownload] = useState(false);
  const [domwnloadDone, setDomwnloadDone] = useState(false);
  const [domwnloadFalse, setDomwnloadFalse] = useState(false);
  const [dates, setDates] = useState([]);

  const postResultatsToApi = () => {
    if (
      officine != "" &&
      chambreFroide != "" &&
      authorizeDownload &&
      datasTemperature.length != 0 &&
      datasHygrometrie.length != 0
    ) {
      axios({
        method: "post",
        url: url.resultats,
        data: {
          resultatTemperature: [datasTemperature],
          resultatHygrometrie: [datasHygrometrie],
          date: date,
          chambreFroide: "/api/chambre_froides/" + chambreFroide,
        },
      })
        .then((response) => {
          if (response.status === 201) {
            setDomwnloadDone(true);
            setDomwnloadFalse(false);
          }
          window.location.reload();
        })
        .catch((e) => {
          console.log("erreur chargement : " + e);
          setDomwnloadDone(false);
          setDomwnloadFalse(true);
        });
    } else {
      alert(
        "Veuillez sélectionner une officine et une chambre froide et/ou vérifiez le format de vos données"
      );
    }
  };

  const handleOnDropTemperature = (data) => {
    let dateFromCsv = data[1].data[0].slice(0, 10);
    if (
      data.length != 97 ||
      dates.some(
        (item) =>
          item.date.slice(0, 10) === dateFromCsv &&
          item.chambre_froide === "/api/chambre_froides/" + chambreFroide
      )
    ) {
      alert(
        "le fichier csv ne contient pas toutes les valeurs ou la date a déja été enregistré"
      );
      setAuthorizeDownload(false);
    } else {
      setDate(dateFromCsv);
      setAuthorizeDownload(true);
      setDatasTemperatures(
        data.slice(1).map((item) => ({
          time: item.data[0].slice(11, 16),
          data: parseFloat(item.data[1]),
        }))
      );
    }
  };
  const handleOnDropHygrometrie = (data) => {
    let newDate = data[1].data[0].slice(0, 10);
    if (newDate != date) {
      alert("les dates ne correspondent pas");
      setAuthorizeDownload(false);
    }
    if (data.length != 97) {
      alert("le fichier csv ne contient pas toutes les valeurs");
      setAuthorizeDownload(false);
    } else {
      setDate(newDate);
      setAuthorizeDownload(true);
      setDatasHygrometrie(
        data.slice(1).map((item) => ({
          time: item.data[0].slice(11, 16),
          data: parseFloat(item.data[1]),
        }))
      );
    }
  };
  const handleOnError = (err) => {
    console.log(err);
  };
  const handleOnRemoveFileTemperature = () => {
    setDatasTemperatures({});
  };
  const handleOnRemoveFileHygrometrie = () => {
    setDatasHygrometrie({});
  };
  useEffect(() => {
    axiosGet(url.resultats, setDates);
  }, [chambreFroide, officine]);

  return (
    <>
      <Paper
        elevation={4}
        sx={{ borderRadius: 10, backgroundColor: "#BABFD180" }}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={10}>
            <Typography variant="h3" sx={{ marginBottom: 1 }} align="center">
              Importer les datas
            </Typography>
          </Grid>
          {domwnloadDone && (
            <Alert severity="success">chargement effectué</Alert>
          )}
          {domwnloadFalse && (
            <Alert severity="error">chargement non effectué, réessayez</Alert>
          )}
          <Grid item xs={10} sx={{ mt: 2 }}>
            <Typography variant="body1" sx={{ marginBottom: 1 }} align="center">
              Veuillez vérifier dans vos fichiers que toutes les heures y sont
              présentes (de 0h00 à 23h45), et commencez par charger les données
              de températures. Vérifiez enfin que les dates soitent au format
              "2021-28-11" (année - jour - mois)
            </Typography>
          </Grid>
          <Grid item xs={10} sx={{ my: 2 }}>
            <SelectOfficine setOfficine={setOfficine} />
          </Grid>
          <Grid item xs={10}>
            <SelectChambreFroide
              setChambreFroide={setChambreFroide}
              officine={officine}
            />
          </Grid>
          <Grid item xs={10} sx={{ mt: 2 }}>
            <Typography variant="h5" sx={{ marginBottom: 1 }} align="center">
              TEMPERATURE :
            </Typography>
            <CSVReader
              onDrop={handleOnDropTemperature}
              onError={handleOnError}
              addRemoveButton
              onRemoveFile={handleOnRemoveFileTemperature}
            >
              <span>
                faites glisser le fichier .csv ou cliquer pour l'importer
              </span>
            </CSVReader>
          </Grid>
          <Grid item xs={10} sx={{ mt: 2 }}>
            <Typography variant="h5" sx={{ marginBottom: 1 }} align="center">
              HYGROMETRIE :
            </Typography>
            <CSVReader
              onDrop={handleOnDropHygrometrie}
              onError={handleOnError}
              addRemoveButton
              onRemoveFile={handleOnRemoveFileHygrometrie}
            >
              <span>
                faites glisser le fichier .csv ou cliquer pour l'importer
              </span>
            </CSVReader>
          </Grid>
          <Grid
            container
            item
            xs={10}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Button
              variant="contained"
              onClick={() => {
                postResultatsToApi();
              }}
              sx={{
                backgroundColor: "#DF7373",
                my: 2,
              }}
            >
              envoyer les résultats
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default CsvImport;
