import React from "react";
import { useState, useEffect } from "react";
import { CSVReader } from "react-papaparse";
import {
  Button,
  Typography,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Alert,
} from "@mui/material";
import SelectOfficine from "../special-features/SelectOfficine";
import SelectChambreFroide from "../special-features/SelectChambreFroide";
import { url, axiosGet } from "../axios";

const axios = require("axios");
const urlApi = "https://api-projet-ecf.herokuapp.com/api/resultats";

function CsvImport() {
  const [datas, setDatas] = useState({});
  const [date, setDate] = useState("");
  const [officine, setOfficine] = useState("");
  const [chambreFroide, setChambreFroide] = useState("");
  const [authorizeDownload, setAuthorizeDownload] = useState(false);
  const [domwnloadDone, setDomwnloadDone] = useState(false);
  const [domwnloadFalse, setDomwnloadFalse] = useState(false);
  const [dates, setDates] = useState({});

  const postResultatsToApi = () => {
    if (officine != "" && chambreFroide != "" && authorizeDownload) {
      axios({
        method: "post",
        url: urlApi,
        data: {
          resultatTemperature: [datas],
          date: date,
          chambreFroide: "/api/chambre_froides/" + chambreFroide,
        },
      })
        .then((response) => {
          console.log(response.status);
          if (response.status === 201) {
            setDomwnloadDone(true);
            setDomwnloadFalse(false);
          }
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

  const handleOnDrop = (data) => {
    if (data.length != 97) {
      alert("le fichier csv ne contient pas toutes les valeurs");
      setAuthorizeDownload(false);
    } else {
      setAuthorizeDownload(true);
      setDatas(
        data.slice(1).map((item) => ({
          time: item.data[0].slice(11, 16),
          data: parseFloat(item.data[1]),
        }))
      );
      setDate(data[1].data[0].slice(0, 10));
    }
  };
  const handleOnError = (err) => {
    console.log(err);
  };
  const handleOnRemoveFile = () => {
    //console.log(data);
    setDatas({});
  };
  useEffect(() => {
    axiosGet(url.resultats, setDates);
  }, []);
  console.log(dates);
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ backgroundColor: "#BABFD180" }}
      >
        <Grid item xs={10}>
          <Typography variant="h3" sx={{ marginBottom: 1 }} align="center">
            Importer les datas Températures
          </Typography>
        </Grid>
        {domwnloadDone && <Alert severity="success">chargement effectué</Alert>}
        {domwnloadFalse && (
          <Alert severity="error">chargement non effectué, réessayez</Alert>
        )}
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
          <CSVReader
            onDrop={handleOnDrop}
            onError={handleOnError}
            addRemoveButton
            onRemoveFile={handleOnRemoveFile}
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
              marginTop: 2,
            }}
          >
            envoyer les résultats
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default CsvImport;
