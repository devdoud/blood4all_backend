# blood4all_backend

C'est mon projet de fin de formation qui consiste a la mise en place
d'une application mobile de recherche de sang dans les banques de sang plus proches pour les medecins.

# Description

L'application denomee BLOOD4ALL est une application mobile destinee aux medecins pour la recherche de sang dans les banques de sang les plus proches. Elle permettra, 

D'une part aux medecins de pouvoir faire la recherche de sang a partir du groupe sanguin, facteur rhesus, du poids du patient, la quantite desiree en ml;Les medecins vont pouvoir consulter les resultats issues de la recherche, si celle si etant favorable, dans le cas echeant, ils vont pouvoir opter pour une alternative et relancer cette fois ci la recherche a nouveau; Une fois le sang retrouve, ils vont pouvoir la reservee tout en generant une codeQR; Ce QR code est partage avec les parents du patient. Ceci sera presente au niveau de la banque pour la recuperation.

D'autre part, les banques de sang vont pouvoir consulter le nombre de poches de sang disponible en stock par groupe sanguin et facteur rhesus. Et mettre a jour le stock une fois qu'une poche de sang est achetee.

## Nouvelles fonctionalites

1- Permettre aux utilisateurs de consulter la liste des banques de sang plus proche d'eux. la Banque de Sang presentera les informations suivantes : les horriares d'ouverture et de fermeture, les besoins en sang et les indications pour s'y rendre.

2- Mettre en place des rappel de don sang.

3-Campagne de sensibilisation

4-Les users peuvent partager leur experience sur les reseau sociaux.

5-Recherche de sang dans les banques de sang par les medecins.

6-Generation de qr code.

7-Possibilite du partage du code qr du docteur au parents  via les reseaux sociaux.

# Installation

## cloner le projet

```
git clone https://github.com/EtuDoud/blood4all_backend.git
```
## Installer les dependances
```
npm install
```
## Signup for doctor
```
https://blood4all-backend.vercel.app/api/auth/doctor/signup
```
### Credentials
```
{
  "firstname": "Ayinde",
  "lastname": "Olagoke",
  "email": "adeyemi@gmail.com",
  "telephone": "0022996173296",
  "password": "password",
  "numOrdreNational": "NUM/0000/ONMB/DEP/AAAA",
  "hopital": "CNHU"
}
```
### result 
```
{
  "user": {
    "id": "clj5m9sww0000mo08tojglpa5",
    "createdAt": "2023-06-21T11:14:10.195Z",
    "updatedAt": "2023-06-21T11:14:10.195Z",
    "firstname": "Adeyemi",
    "lastname": "Olagoke",
    "email": "adeyemi@gmail.com",
    "telephone": "0022996173296",
    "password": "$2b$10$MEnA7hEGWYA2NKFam1SgDeLAWJ1GrmxNVYdWCV4T2aGnDhrXFm/HO",
    "profil": null,
    "hopital": "CNHU",
    "numOrdreNational": "NUM/0000/ONMB/DEP/AAAA"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsajVtOXN3dzAwMDBtbzA4dG9qZ2xwYTUiLCJlbWFpbCI6ImFkZXllbWlAZ21haWwuY29tIiwiaWF0IjoxNjg3MzYzOTE5LCJleHAiOjE2ODczNjc1MTl9.DVH-DH9H6K5V9jzQM2skRwD8nPwk4agezRKEIb4iBq0"
}
```
## SignIn
```
https://blood4all-backend.vercel.app/api/auth/doctor/signin
```
### credential
```
{
  "email": "alade@gmail.com",
  "password": "tete"
}
```
### result
```
{
  "user": {
    "id": "clj5xye650000ml08m68lofnp",
    "createdAt": "2023-06-21T16:41:13.196Z",
    "updatedAt": "2023-06-21T16:41:13.196Z",
    "firstname": "Alade",
    "lastname": "Oyinbo",
    "email": "alade@gmail.com",
    "telephone": "0022996173296",
    "password": "$2b$10$pzQNkYPv1WV7Fk4KEJILYuoshwCWevDtjxAbn3L0yuycGjffgW0Q6",
    "profil": null,
    "hopital": "HOMEL",
    "numOrdreNational": "NUM/0000/ONMB/DEP/AAAA"
  }
}
```

