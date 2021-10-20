const axios = require("axios");

export const axiosGet = (url, setState) => {
  try {
    axios.get(url).then(function (response) {
      if (response.status !== 200) {
        alert("problème de chargement de data");
      }
      setState(response.data["hydra:member"]);
    });
  } catch (e) {
    console.log("erreur axios : " + e);
  }
};

//const urlBase = "https://127.0.0.1:8000/api/";
const urlBase = "https://api-projet-ecf.herokuapp.com/api/";
export const url = {
  chambreFroides: urlBase + "chambre_froides",
  officines: urlBase + "officines",
  resultats: urlBase + "resultats",
  utilisateurs: urlBase + "utilisateurs",
};

export const roles = {
  admin: "admin",
  technicien: "technicien",
  officine: "officine",
};
