import React, { useEffect, useState } from "react";
import { InputLabel, Select, MenuItem } from "@mui/material";
import { url, jwt } from "../axios";
const axios = require("axios");

function SelectOfficine(props) {
  const [officines, setOfficines] = useState([]);
  const [valueInput, setValueInput] = useState("");
  const getOfficines = () => {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
      axios
        .get(url.officines)
        .then(function (response) {
          if (response.status === 500) {
            alert("problème de chargement de data");
          }
          setOfficines(response.data["hydra:member"]);
        })
        .catch(function (error) {
          console.log("erreurs api - officines : " + error);
        });
    } catch (e) {
      console.log("erreur asiox : " + e);
    }
  };
  useEffect(() => {
    getOfficines();
  }, []);

  return (
    <>
      <InputLabel id="select_chambre_officine">select officine</InputLabel>
      <Select
        labelId="select_chambre_officine"
        id="select_chambre_officine_id"
        label="officine"
        value={valueInput}
        onChange={(e) => {
          props.setOfficine(e.target.value);
          setValueInput(e.target.value);
        }}
        sx={{ width: "100%" }}
      >
        {officines.map((item, index) => {
          return (
            <MenuItem key={index} value={item.id}>
              {item.libelle} {item.custom_identifiant}
            </MenuItem>
          );
        })}
      </Select>
    </>
  );
}

export default SelectOfficine;
