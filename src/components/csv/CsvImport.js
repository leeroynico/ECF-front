import React from "react";
import { useState } from "react";
import { CSVReader } from "react-papaparse";
import {
  Button,
  Typography,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";

const axios = require("axios");
const urlApi = "https://api-projet-ecf.herokuapp.com/api/resultats";

function CsvImport() {
  const [datas, setDatas] = useState({});
  const [date, setDate] = useState("");

  const postResultatsToApi = () => {
    axios({
      method: "post",
      url: urlApi,
      data: {
        date: "2021-10-08T19:56:24.048Z",
        validation: true,
        commentaire: "",
        resultatTemperature: [datas],
        resultatHygrometrie: ["string from react oh yeah "],
        chambreFroide: "/api/chambre_froides/1",
      },
    });
  };
  const handleOnDrop = (data) => {
    setDatas(
      data.slice(1).map((item) => ({
        time: item.data[0].slice(11, 16),
        data: parseFloat(item.data[1]),
      }))
    );
    setDate(data[1].data[0].slice(0, 10));
  };
  const handleOnError = (err, file, inputElem, reason) => {
    //TODO => condition pour la virgule
    console.log(err);
  };

  const handleOnRemoveFile = (data) => {
    //console.log(data);
    setDatas({});
  };

  return (
    <>
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
        <Grid item xs={10} sx={{ my: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="select_chambre_officine">officine</InputLabel>
            <Select
              labelId="select_chambre_officine"
              id="select_chambre_officine_id"
              value="officine"
              label="officine"
              // onChange={""}
            >
              <MenuItem value={10}>chambre 1 </MenuItem>
              <MenuItem value={20}>chambre 2 </MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={10}>
          <FormControl fullWidth>
            <InputLabel id="selec_chambre_froide">Chambre Froide</InputLabel>
            <Select
              labelId="selec_chambre_froide"
              id="selec_chambre_froide_id"
              value="chambre"
              label="chambre_froide"
              // onChange={""}
            >
              <MenuItem value={10}>chambre 1 </MenuItem>
              <MenuItem value={20}>chambre 2 </MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
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
