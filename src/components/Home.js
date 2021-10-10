import React from "react";
import Charts from "./charts/Charts";
import CsvImport from "./csv/CsvImport";

const axios = require("axios");
const urlApi = "https://api-projet-ecf.herokuapp.com/api/resultats";
console.log(localStorage);
function home() {
  axios
    .get(urlApi)
    .then(function (response) {
      if (response.status === 500) {
        alert("problème de cargement de data");
      }
      console.log(response.data);
    })
    .catch(function (error) {
      console.log("erreurs apizd - axios : " + error);
    })
    .then(function () {
      // always executed
    });

  return (
    <div>
      <Charts />
      <CsvImport />
    </div>
  );
}

export default home;
