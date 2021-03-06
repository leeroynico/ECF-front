import React, { useEffect, useState } from "react";
import { InputLabel, Select, MenuItem } from "@mui/material";
import { url, jwt } from "../axios";
const axios = require("axios");

function SelectChambreFroide(props) {
  const [chambresFroides, setChambresFroides] = useState([]);
  const [valueInput, setValueInput] = useState("");

  const getChambreFroides = () => {
    axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
    axios
      .get(url.chambreFroides)
      .then(function (response) {
        if (response.status === 500) {
          alert("problème de chargement de data");
        }
        let uri = "/api/officines/" + props.officine;
        setChambresFroides(
          response.data["hydra:member"].filter((item) => item.officine === uri)
        );
      })
      .catch(function (error) {
        console.log("erreurs api - chambres froides : " + error);
      });
  };
  useEffect(() => {
    getChambreFroides();
  }, [props.officine]);

  return (
    <>
      <InputLabel id="select_chambre_froide">select chambre Froide</InputLabel>
      <Select
        labelId="select_chambre_froide"
        id="select_chambre_froide_id"
        label="chambre Froide"
        value={valueInput}
        onOpen={() =>
          props.officine === "" ? alert("veuillez choisir une officine") : ""
        }
        onChange={(e) => {
          props.setChambreFroide(e.target.value);
          setValueInput(e.target.value);
        }}
        sx={{ width: "100%" }}
      >
        {chambresFroides.map((item, index) => {
          return (
            <MenuItem key={index} value={item.id}>
              {item.libell}
            </MenuItem>
          );
        })}
      </Select>
    </>
  );
}

export default SelectChambreFroide;
