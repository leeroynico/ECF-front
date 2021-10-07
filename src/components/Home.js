import React from "react";

const axios = require("axios");
const urlApi = "https://api-projet-ecf.herokuapp.com/api/resultats";

function home() {
  axios
    .get(urlApi)
    .then(function (response) {
      if (response.status != 200) {
        alert("roblème de cargement de data");
      }
      console.log(response.data);
    })
    .catch(function (error) {
      console.log("erreurs apizd - axios : " + error);
    })
    .then(function () {
      // always executed
    });

  return <div>je suis à la maison</div>;
}

export default home;
