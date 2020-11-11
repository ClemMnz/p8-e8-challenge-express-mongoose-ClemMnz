# Challenge Express/Middleware/MongoDB

Le but de ce challenge est d'implémenter une VRAIE authentification !

Voici les routes à implémenter : 

|Route|Restrictions|Description|
|---|---|---|
|/| - | Affiche "Bonjour" et deux boutons "connection" et "inscription"
|/login| - | Affiche un formulaire de connexion, et connecte l'utilisateur
|/logout| - | Deconnexion de l'utilisateur courant
|/home| L'utilisateur doit être connecté - *sinon redirection*| Affiche "Bonjour ${utilisateur connecté}"
|/signin|(BONUS)| Affiche un formulaire d'inscription, et enregistre l'utilisateur

## Importer les données

Il faut importer les données situées dans le dossier `data_to_import`. Pour cela, assurez vous que le serveur mongod est bien lancé, puis connectez vous avec le client (`mongo`) et créez la base `demousers` avec `use demousers`.

Puis, dans un terminal à la racine du projet : 
> `mongorestore -d demousers data_to_import`

Les données seront importées dans une collection `Users`, ou chaque document à 2 proriétés : `name` et `password`

## Les mot de passe

Les mots de passe présents dans la DB sont cryptés avec le package `bcrypt` ([la doc ici](https://www.npmjs.com/package/bcrypt#usage)), en utilisant la "salt" suivante : 
> '$2b$10$uvPO3bo5xmA8nUmo7JpF0e'

Voici les paires name/password en clair : 
* Georges : "bonjour"
* Walt : "Mickey"

## Pour le reste

Soyez ingénieux, et essayez au maximum de réutiliser le code des cours précédents : 
- [découverte middlewares](https://github.com/O-clock-Pulsar/p8-e6-decouverte-middlewares)
- [challenge middlewares pseudo-auth](https://github.com/O-clock-Pulsar/p8-e6-challenge-middleware-SimonMARTIN87)
- [mongoose models](https://github.com/O-clock-Pulsar/p8-e8-express-mongodb)