import React from "react";
import { useState } from "react";
import { CSVReader } from "react-papaparse";
const buttonRef = React.createRef();
const axios = require("axios");
const urlApi = "https://api-projet-ecf.herokuapp.com/api/resultats";

function CsvImport() {
  const [datas, setDatas] = useState({});

  const postResultatsToApi = () => {
    axios({
      method: "post",
      url: urlApi,
      data: {
        date: "2021-10-08T19:56:24.048Z",
        validation: true,
        commentaire: "",
        resultatTemperature: ["string from react "],
        resultatHygrometrie: ["string from react oh yeah "],
        chambreFroide: "/api/chambre_froides/1",
      },
    });
  };

  const handleOnDrop = (data) => {
    console.log("---------------------------");
    console.log(data);
    console.log("---------------------------");
  };

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  const handleOnRemoveFile = (data) => {
    console.log("---------------------------");
    console.log(data);
    console.log("---------------------------");
  };

  return (
    <>
      <h5>Click and Drag Upload</h5>
      <CSVReader
        onDrop={handleOnDrop}
        onError={handleOnError}
        addRemoveButton
        onRemoveFile={handleOnRemoveFile}
      >
        <span>Drop CSV file here or click to upload.</span>
      </CSVReader>
      <div></div>
      <button
        onClick={() => {
          postResultatsToApi();
        }}
      >
        envoyez les résultats
      </button>
    </>
  );
}

export default CsvImport;
