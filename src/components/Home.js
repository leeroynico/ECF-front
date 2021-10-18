import React from "react";
import ChartsHome from "./charts/ChartsHome";
import CsvImport from "./csv/CsvImport";
import CreateOfficine from "./special-features/CreateOfficine";
import ModifyPassword from "./special-features/ModifyPassword";
import CreateTechnicien from "./special-features/CreateTechnicien";
import { Grid } from "@mui/material";
import { roles } from "./axios";

let role = localStorage.getItem("role");

function home() {
  return (
    <div>
      {role === roles.admin || role === roles.officine ? <ChartsHome /> : ""}
      {role === roles.admin || role === roles.technicien ? <CsvImport /> : ""}
      {role === roles.admin ? <CreateOfficine /> : ""}
      {role === roles.admin ? <CreateTechnicien /> : ""}
      {role === roles.admin || role === roles.technicien ? (
        <ModifyPassword />
      ) : (
        ""
      )}
    </div>
  );
}

export default home;
