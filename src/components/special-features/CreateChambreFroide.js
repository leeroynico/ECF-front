import React from "react";
import { useState } from "react";
import { TextField, Grid, Typography, Button, Paper } from "@mui/material";
import { escapeHtml } from "../FonctionsRandom";

function CreateChambreFroide() {
  const apiRequest = {
    libelle: "string",
    adresse: "string",
    telephone: "string",
    password: "string",
    chambreFroides: ["string"],
  };

  const [state, setstate] = useState(initialState);

  const center = { display: "flex", justifyContent: "center" };
  const inputMui = (label, w = 6) => {
    return (
      <Grid item xs={w} sx={center}>
        <TextField
          sx={{ width: w > 6 ? "90%" : "80%" }}
          id="loginId"
          label={label}
          variant="outlined"
          type={label === "password" ? "password" : ""}
          // onChange={(e) => setUserName(e.target.value)}
        />
      </Grid>
    );
  };

  const submit = (e) => console.log(e);

  return (
    <>
      <Paper
        sx={{
          marginTop: 10,
          backgroundColor: "#BABFD180",
          borderRadius: 10,
          // color: "#DA5552",
        }}
      >
        <form onSubmit={submit}>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" align="center">
                crééer une chambre froide
              </Typography>
            </Grid>
            {inputMui("identifiant")}
            {inputMui("password")}
            {inputMui("adresse postale", 12)}
            {inputMui("ville")}
            {inputMui("telephonne")}

            <Grid
              item
              xs={10}
              sx={{
                marginBottom: 2,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                // onClick={send}
                sx={{ backgroundColor: "#DF7373", width: "60%" }}
              >
                créer
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </>
  );
}

export default CreateChambreFroide;
