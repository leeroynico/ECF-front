import React from "react";
import { useState } from "react";
import { CSVReader } from "react-papaparse";
import { Button, Typography } from "@mui/material";

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
      <Typography variant="h4" alihgn="center">
        Importer les datas
      </Typography>
      <CSVReader
        onDrop={handleOnDrop}
        onError={handleOnError}
        addRemoveButton
        onRemoveFile={handleOnRemoveFile}
      >
        <span>Drop CSV file here or click to upload.</span>
      </CSVReader>
      <Button
        variant="contained"
        onClick={() => {
          postResultatsToApi();
        }}
        sx={{ backgroundColor: "#DF7373" }}
      >
        envoyer les résultats
      </Button>
    </>
  );
}

export default CsvImport;
