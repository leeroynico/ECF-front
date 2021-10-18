import React, { useState } from "react";
import {
  TextField,
  Grid,
  Typography,
  Button,
  Paper,
  Divider,
  Alert,
} from "@mui/material";
import SelectTechnicien from "./SelectTechnicien";
import { url, roles } from "../axios";
const axios = require("axios");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
let role = localStorage.getItem("role");
let idTechnicien = localStorage.getItem("id");

function ModifyPassword() {
  const [technicien, setTechnicien] = useState(
    role === roles.technicien ? idTechnicien : 0
  );
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [updateDone, setupdateDone] = useState(false);

  const update = () => {
    if (password === passwordConfirm) {
      try {
        axios
          .put(url.utilisateurs + "/" + technicien, {
            password: bcrypt.hashSync(password, salt),
          })
          .then((response) => {
            console.log("update password :", response);
            setupdateDone(true);
          });
      } catch (error) {
        console.log("error update pawword : " + error);
      }
    } else {
      alert("vérifiez vos mots de passe ");
    }
  };

  return (
    <>
      <Paper
        sx={{
          marginTop: 10,
          backgroundColor: "#BABFD180",
          borderRadius: 10,
          marginBottom: 10,
        }}
      >
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={8}>
            <Typography>
              {role === roles.technicien
                ? "modifier mon mot de passe"
                : "Modifier le mot de passe d'un technicien"}
            </Typography>
          </Grid>
          {updateDone && (
            <Alert severity="success">modification effectuée</Alert>
          )}
          {role === roles.admin ? (
            <Grid item xs={10} sx={{ my: 2 }}>
              <SelectTechnicien setTechnicien={setTechnicien} />
            </Grid>
          ) : (
            ""
          )}
          <Grid item xs={6}>
            <TextField
              type="password"
              label="mot de passe"
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="password"
              label="confirmer mot de passe"
              variant="outlined"
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={update}
              sx={{ backgroundColor: "#DF7373", marginBottom: 5 }}
            >
              modifier mot de passe
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default ModifyPassword;
