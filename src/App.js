import Home from "./components/Home";
import Login from "./components/login/Login";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Grid, Typography, createTheme, ThemeProvider } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Logo from "./images/logo.png";
import NotFound from "./components/pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  const font = "'Catamaran', sans-serif";
  const theme = createTheme({
    typography: {
      fontFamily: "'Catamaran', sans-serif",
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
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
            <ExitToAppIcon
              onClick={() => {
                localStorage.clear();
                window.location.pathname = "/home";
              }}
              style={{ cursor: "pointer" }}
            />
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
      </ThemeProvider>
    </>
  );
}

export default App;
