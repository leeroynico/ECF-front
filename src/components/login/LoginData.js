import React from "react";
import { useState, useEffect } from "react";
const axios = require("axios");
const urlApi = "https://api-projet-ecf.herokuapp.com/api/utilisateurs";

function LoginData() {
  const [users, setUsers] = useState([]);
  const getUser = () => {
    axios
      .get(urlApi)
      .then(function (response) {
        if (response.status != 200) {
          alert("roblème de cargement de data");
        }
        setUsers(response.data["hydra:member"]);
        //console.log(response.data["hydra:member"]);
      })
      //TODO => gestion erreurs API
      .catch(function (error) {
        console.log("erreurs api - axios : " + error);
      });
  };
  useEffect(() => {
    getUser();
  }, []);
  console.log(users);
  return <div></div>;
}
export default LoginData;
