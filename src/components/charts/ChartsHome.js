import React from "react";
import { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  FormControlLabel,
  Switch,
  TextField,
  Button,
} from "@mui/material";
import { Grid as GridMui } from "@mui/material";
import { url } from "../axios";
import SelectChambreFroide from "../special-features/SelectChambreFroide";
import ChartSpline from "./ChartSpline";
const axios = require("axios");

function ChartsHome() {
  const [datasTemperature, setDatasTemperature] = useState([]);
  const [datasHygrometrie, setDatasHygrometrie] = useState([]);
  const [officine, setOfficine] = useState(1);
  const [chambreFroide, setChambreFroide] = useState(null);
  const [date, setDate] = useState("");
  const [dates, setDates] = useState([]);
  const [valueInput, setValueInput] = useState("");
  const [validation, setValidation] = useState(false);
  const [resultatId, setResultatId] = useState(null);
  const [commentaire, setCommentaire] = useState("");

  const getDatas = () => {
    axios
      .get(url.resultats)
      .then(function (response) {
        if (response.status != 200) {
          alert("sélectionner une chambre froide et une date");
        }
        let uri = "/api/chambre_froides/" + chambreFroide;

        setDates(
          response.data["hydra:member"]
            .filter((item) => item.chambre_froide === uri)
            .map((item) => item.date.slice(0, 10))
        );
        if (Number.isInteger(date)) {
          setDatasTemperature(
            response.data["hydra:member"][date].resultatTemperature[0]
          );
          setDatasHygrometrie(
            response.data["hydra:member"][date].resultatHygrometrie[0]
          );
          setResultatId(response.data["hydra:member"][date].id);
          setValidation(response.data["hydra:member"][date].validation);
        }
      })
      .catch((error) => {
        console.log("erreurs api - axios : " + error);
      });
  };
  useEffect(() => {
    getDatas();
  }, [chambreFroide, date]);

  const updateResultat = () => {
    try {
      axios
        .put(url.resultats + "/" + resultatId, {
          validation: validation,
          commentaire: commentaire,
        })
        .then((response) => console.log("update data resultat :", response));
    } catch (error) {
      console.log("error update resultat : " + error);
    }
  };

  return (
    <>
      <GridMui
        container
        spacing={1}
        justifyContent="center"
        sx={{ marginTop: 3 }}
      >
        <GridMui item xs={10}>
          <SelectChambreFroide
            setChambreFroide={setChambreFroide}
            officine={officine}
          />
        </GridMui>
        <GridMui item xs={10}>
          <FormControl fullWidth>
            <InputLabel id="select_date">date</InputLabel>
            <Select
              labelId="select_date"
              id="select_date_id"
              value={date}
              label="date"
              onChange={(e) => {
                setDate(e.target.value);
                setValueInput(e.target.value);
              }}
            >
              {dates.map((item, index) => {
                return (
                  <MenuItem key={index} value={index}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </GridMui>
      </GridMui>
      <GridMui item xs={11}>
        {datasTemperature.length === 0 ? (
          <Typography align="center" variant="body1" paragraph>
            veuillez sélectionner une chambre froide et une date pour accéder
            aux graphiques
          </Typography>
        ) : (
          <>
            <ChartSpline
              datas={datasTemperature}
              title="température"
              color="#DF7373"
            />
            <ChartSpline
              datas={datasHygrometrie}
              title={"hygrométrie"}
              color="#37323E"
            />
          </>
        )}
      </GridMui>
      <GridMui item xs={11}>
        <FormControlLabel
          align="center"
          control={
            <Switch
              checked={validation}
              onChange={() => setValidation(!validation)}
            />
          }
          label="Validation des données"
          labelPlacement="start"
        />
        <TextField
          id="outlined-multiline-flexible"
          label="commentaires"
          multiline
          maxRows={5}
          onChange={(e) => setCommentaire(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={() => {
            updateResultat();
          }}
          sx={{
            backgroundColor: "#DF7373",
            my: 2,
          }}
        >
          valider et/ou commenter
        </Button>
      </GridMui>
    </>
  );
}

export default ChartsHome;