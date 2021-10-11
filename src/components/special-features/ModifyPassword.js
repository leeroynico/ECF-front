import React from "react";
import {
  TextField,
  Grid,
  Typography,
  Button,
  Paper,
  Divider,
} from "@mui/material";

function ModifyPassword() {
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
            <Typography>Modifier le mot de passe d'un technicien</Typography>
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
            <TextField
              type="password"
              id="loginId"
              label="confirmer mot de passe"
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
              modifier
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default ModifyPassword;
