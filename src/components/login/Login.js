import React from "react";
import { useState, useEffect } from "react";
import LoginView from "./LoginView";
import { url, axiosGet, roles } from "../axios";
const bcrypt = require("bcryptjs");
function Login() {
  const [identifiant, setIdentifiant] = useState("");
  const [password, setPassword] = useState("");
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [officines, setOfficines] = useState([]);
  const utilisateur = utilisateurs.filter((item) => item.nom === identifiant);
  const officine = officines.filter(
    (item) => item.custom_identifiant === identifiant
  );
  //ab1mjii288 (PHARMA - 62 -3)
  const connect = (e) => {
    e.preventDefault();
    if (
      utilisateurs.some((item) => item.nom === identifiant) &&
      bcrypt.compareSync(password, utilisateur[0].password)
    ) {
      window.location.pathname = "/home";
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("role", utilisateur[0].role);
      localStorage.setItem("id", utilisateur[0].id);
    } else if (
      officines.some((item) => item.custom_identifiant === identifiant) &&
      bcrypt.compareSync(password, officine[0].password)
    ) {
      window.location.pathname = "/home";
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("role", roles.officine);
      localStorage.setItem("idOfficine", officine[0].id);
    } else {
      alert("mauvais identifiant ou mot de passe");
    }
  };

  useEffect(() => {
    axiosGet(url.utilisateurs, setUtilisateurs);
    axiosGet(url.officines, setOfficines);
  }, [identifiant, password]);

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
