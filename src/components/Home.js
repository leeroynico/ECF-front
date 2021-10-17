import React from "react";
import ChartsHome from "./charts/ChartsHome";
import CsvImport from "./csv/CsvImport";
import CreateOfficine from "./special-features/CreateOfficine";
import ModifyPassword from "./special-features/ModifyPassword";
import { Grid } from "@mui/material";
import { roles } from "./axios";

const axios = require("axios");
const urlApi = "https://api-projet-ecf.herokuapp.com/api/resultats";
let role = localStorage.getItem("role");

function home() {
  return (
    <div>
      {role === roles.admin || role === roles.officine ? <ChartsHome /> : ""}
      {role === roles.admin || role === roles.technicien ? <CsvImport /> : ""}
      {role === roles.admin ? <CreateOfficine /> : ""}
      {role === roles.admin ? <ModifyPassword /> : ""}
    </div>
  );
}

export default home;
