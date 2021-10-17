# TD TEMP

## Description :

Dans le cadre d'une évaluation lors de ma formation de dev Full stack, j'ai réalisé cette application qui permet de gérer les données de température et d'hygrométrie pour des officines (fictives). On peut alors charger les données, les consulter sous forme de graphique ou encore gérer les techniciens et les officines.

## installation en local :

Ce projet est réalisé à partir de react.js (v17.0.2).
Pour le récupérer, effecutez les commandes suivantes (dans votre console, en vous plaçant sur le dossier de travail dans lequel vous voulez importer le projet, et en prenant soin d'installer git sur votre machine)

- git init
- git clone git@github.com:leeroynico/ECF-front.git

Listez et vériifer que vous êtes bien placés sur la branche main

- git branch

Ensuite, installer toutes les dépendances nécessaires au bon fonctionnement de react :

- npm install

Vous pouvez ensuite lancer l'application avec :

- npm start

## déploiement :

Vous pouvez utiliser heroku, après avoir créer un compte (https://signup.heroku.com), installer heroku sur votre machine :

- pour mac : brew tap heroku/brew && brew install heroku
- pour ubuntu : sudo snap install --classic heroku
- pour windows : https://devcenter.heroku.com/articles/heroku-cli#download-and-install

Vérifiez votre installation :

- heroku --version

Connecter votre compte :

- heroku login

Ensuite, le build de react sera fait par heroku :

- heroku create 'nom_du_site'
- git add .
- git commit -m "react-create-app on Heroku"
- git push heroku main
- heroku open

Enjoy ;)
