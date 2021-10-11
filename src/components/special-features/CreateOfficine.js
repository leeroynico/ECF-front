import React from "react";
import {
  TextField,
  Grid,
  Typography,
  Button,
  Paper,
  Divider,
} from "@mui/material";

function CreateOfficine() {
  return (
    <>
      <Paper
        sx={{
          marginTop: 10,
          mx: 2,
          p: 3,
          backgroundColor: "#BABFD180",
          borderRadius: 20,
          // color: "#DA5552",
        }}
      >
        <Grid
          container
          spacing={4}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <Typography>crééer une officine</Typography>
          </Grid>
          <Grid item>
            <TextField
              id="loginId"
              label="identifiant"
              variant="outlined"
              // onChange={(e) => setUserName(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              type="password"
              id="loginId"
              label="mot de passe"
              variant="outlined"
              // onChange={(e) => setUserName(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              // onClick={send}
              sx={{ backgroundColor: "#DF7373" }}
            >
              envoyer
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default CreateOfficine;
