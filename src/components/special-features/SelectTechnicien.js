import React, { useEffect, useState } from "react";
import { InputLabel, Select, FormControl, MenuItem } from "@mui/material";
import { roles, url, jwt } from "../axios";
const axios = require("axios");

function SelectTechnicien(props) {
  const [techniciens, setTechniciens] = useState([]);
  const [valueInput, setValueInput] = useState("techniciens");

  const getTechnicien = () => {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
      axios
        .get(url.utilisateurs)
        .then(function (response) {
          if (response.status === 500) {
            alert("problème de chargement de data");
          }
          setTechniciens(
            response.data["hydra:member"].filter(
              (item) => item.role === roles.technicien
            )
          );
        })
        .catch(function (error) {
          console.log("erreurs api - officines : " + error);
        });
    } catch (e) {
      console.log("erreur asiox : " + e);
    }
  };
  useEffect(() => {
    getTechnicien();
  }, [props]);

  return (
    <>
      <InputLabel id="select_technicien">select technicien</InputLabel>
      <Select
        labelId="select_technicien"
        id="select_technicien_id"
        value={valueInput}
        onChange={(e) => {
          props.setTechnicien(e.target.value);
          setValueInput(e.target.value);
        }}
        sx={{ width: "100%" }}
      >
        {techniciens.map((item, index) => {
          return (
            <MenuItem key={index} value={item.id}>
              {item.nom} {item.prenom}
            </MenuItem>
          );
        })}
      </Select>
    </>
  );
}

export default SelectTechnicien;
