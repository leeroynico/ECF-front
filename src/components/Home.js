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
    <>
      <Grid container justifyContent="center" spacing={2}>
        {role === roles.admin || role === roles.officine ? (
          <Grid item md={10} xs={11}>
            <ChartsHome />
          </Grid>
        ) : (
          ""
        )}
        {role === roles.admin || role === roles.technicien ? (
          <Grid item md={6} xs={11}>
            <CsvImport />
          </Grid>
        ) : (
          ""
        )}
        {role === roles.admin ? (
          <Grid item md={6} xs={11}>
            <CreateOfficine />
          </Grid>
        ) : (
          ""
        )}
        {role === roles.admin ? (
          <Grid item md={4} xs={11}>
            <CreateTechnicien />
          </Grid>
        ) : (
          ""
        )}
        {role === roles.admin || role === roles.technicien ? (
          <Grid item md={4} xs={11}>
            <ModifyPassword />
          </Grid>
        ) : (
          ""
        )}
      </Grid>
    </>
  );
}

export default home;
