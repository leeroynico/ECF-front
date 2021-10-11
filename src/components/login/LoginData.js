import React from "react";
import { useState, useEffect } from "react";
const axios = require("axios");
const urlApiUtilisateurs =
  "https://api-projet-ecf.herokuapp.com/api/utilisateurs";

function LoginData() {
  const [users, setUsers] = useState([]);
  const getUser = () => {
    axios
      .get(urlApiUtilisateurs)
      .then(function (response) {
        setUsers(response.data["hydra:member"]);
        console.log(response.data["hydra:member"]);
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
