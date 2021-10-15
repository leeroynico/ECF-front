const axios = require("axios");

export const axiosGet = (url, setState) => {
  try {
    axios.get(url).then(function (response) {
      if (response.status != 200) {
        alert("problème de chargement de data");
      }
      setState(response.data["hydra:member"]);
    });
  } catch (e) {
    console.log("erreur axios : " + e);
  }
};

// export const axiosPost = (url, data) => {
//   try {
//     axios({
//       method: "post",
//       url: url,
//       data: data,
//     });
//   } catch (e) {
//     console.log("erreur post :" + e);
//   }
// };

const urlBase = "https://api-projet-ecf.herokuapp.com/api/";
export const url = {
  chambreFroides: urlBase + "chambre_froides",
  officines: urlBase + "officines",
  resultats: urlBase + "resultats",
  utilisateurs: urlBase + "utilisateurs",
};
