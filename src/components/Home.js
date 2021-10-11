import React from "react";
import Charts from "./charts/Charts";
import CsvImport from "./csv/CsvImport";
import CreateOfficine from "./special-features/CreateOfficine";
import ModifyPassword from "./special-features/ModifyPassword";
import { Grid } from "@mui/material";

const axios = require("axios");
const urlApi = "https://api-projet-ecf.herokuapp.com/api/resultats";
let role = localStorage.getItem("role");

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
  // console.log(localStorage.getItem("role"));
  return (
    <div>
      <Charts />
      <CsvImport />
      <CreateOfficine />
      <ModifyPassword />
    </div>
  );
}

export default home;
