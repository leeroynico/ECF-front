import React from "react";
const axios = require("axios");
const urlApi = "https://api-projet-ecf.herokuapp.com/api/officines";
const getOfficines = () => {
  axios
    .get(urlApi)
    .then(function (response) {
      if (response.status === 500) {
        alert("problème de cargement de data");
      }
      console.log(response.data);
    })
    .catch(function (error) {
      console.log("erreurs api - officines : " + error);
    });
};

function SelectOfficine() {
  return <div></div>;
}

export default SelectOfficine;
