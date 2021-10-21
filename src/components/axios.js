const axios = require("axios");

export const axiosGet = (url, setState) => {
  try {
    axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
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

//const urlBase = "https://127.0.0.1:8000/api/"; à modifier selon vos paramètres en local
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

export const jwt =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2MzQ4MDMzNTQsImV4cCI6MTYzNzIyMjU1NCwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiYWRtaW4ifQ.oLNqCU130ggwVXiiSVsMPnCLlfk9znBCjFDO20iMKtfQkErY1CWyp8Ci3x5dvIWFm4shFk9YhYTzHhT2_HbWQnKRulL4PydR7NRnlTY4UGVtOHr2d_Khe3-gd58CQHstP5kMgV7yH7X-HPjUxBOm1uzq4Lh6Bss9bbeWd1SvtCzAdYnVyRbhPJpowQ5CGNwkHODoneAVDljCt2NdQEbIYYxMMrcBSuv2dFADDKQ-NAJn4Zt3q2d227noQu2ItSYzru76qc2FJTP2mrZ7jEIWOraujmiF3vgXbw14dREf4q7wUIn1XGxcxlqpt7zzaGEJiy5d2wjo96H2tfrnXldiTA";
