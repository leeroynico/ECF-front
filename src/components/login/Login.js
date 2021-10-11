import React from "react";
import { useState, useEffect } from "react";
import LoginView from "./LoginView";
const axios = require("axios");
const urlApiUtilisateurs =
  "https://api-projet-ecf.herokuapp.com/api/utilisateurs";

function Login() {
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

  return (
    <>
      <LoginView users={users} />
    </>
  );
}
export default Login;
