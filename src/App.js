import logo from "./logo.svg";
// import "./App.css";

import Home from "./components/Home";
import Login from "./components/login/Login";
import CsvImport from "./components/csv/CsvImport";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Logo from "./images/logo.png";
import NotFound from "./components/pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Grid container spacing={1} sx={{ margin: 1 }}>
        <Grid item xs={2}>
          <img src={Logo} alt="logo" className="logoImg" />
        </Grid>
        <Grid item xs={8}>
          <Typography variant="overline" component="h2" align="right">
            Bonjour et bienvenue chez TD Temp
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <ExitToAppIcon />
        </Grid>
      </Grid>
      <BrowserRouter>
        <Switch>
          <ProtectedRoute path="/Home" exact component={Home} />
          <Route path="/" exact component={Login} />
          <Route path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>

      {/*  <CsvImport />
        <Home /> 
        <Login />
        <Charts />*/}
    </>
  );
}

export default App;
