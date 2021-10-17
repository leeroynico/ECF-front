import React from "react";
import { useState, useEffect } from "react";
import LoginView from "./LoginView";
import { url, axiosGet } from "../axios";
const bcrypt = require("bcryptjs");
let salt = bcrypt.genSaltSync(10);
const axios = require("axios");
function Login() {
  const [identifiant, setIdentifiant] = useState("");
  const [password, setPassword] = useState("");
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [role, setRole] = useState("");
  const utilisateur = utilisateurs.filter((item) => item.nom === identifiant);
  // console.log(utilisateur);
  const connect = (e) => {
    e.preventDefault();
    if (
      utilisateurs.some((item) => item.nom === identifiant) &&
      bcrypt.compareSync(password, utilisateur[0].password)
    ) {
      window.location.pathname = "/home";
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("role", utilisateur[0].role);
    } else {
      alert("mauvais identifiant ou mot de passe");
    }
    // localStorage.setItem("role", "admin");
    // localStorage.clear();
  };

  useEffect(() => {
    axiosGet(url.utilisateurs, setUtilisateurs);
  }, []);

  return (
    <>
      <LoginView
        setIdentifiant={setIdentifiant}
        setPassword={setPassword}
        connect={connect}
      />
    </>
  );
}
export default Login;
