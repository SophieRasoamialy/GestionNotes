Système de Gestion de Notes
Ce projet vise à développer une application web pour la gestion des notes, utilisant React.js pour le frontend et Express.js pour le backend. L'application comporte deux interfaces distinctes : une pour les professeurs et une pour les administrateurs.

Fonctionnalités
Pour les professeurs :
Ajouter, modifier et supprimer des notes pour les étudiants.
Visualiser les actions effectuées sur les notes.
Pour les administrateurs :
Visualiser les actions effectuées par les professeurs sur les notes.
Technologie utilisée
Frontend : React.js
Backend : Express.js
Base de données : gestion_pointage
Configuration requise
Node.js version 18.16.1 ou ultérieure
Installation
Clonez ce dépôt sur votre machine locale.
Accédez au répertoire du projet.
Installez les dépendances en exécutant la commande suivante :
bash
Copy code
npm install
Démarrez le serveur en exécutant la commande suivante :
bash
Copy code
npm start
Structure du Projet
frontend/ : Contient le code source du frontend React.js.
backend/ : Contient le code source du backend Express.js.
Base de Données
Le système maintient les tables suivantes :

etudiant : Table contenant les informations sur les étudiants (numéro étudiant, nom, moyenne).
matiere : Table contenant les informations sur les matières (nom, design, coefficient).
note : Table contenant les notes attribuées aux étudiants pour chaque matière.
audit_note : Table pour enregistrer les opérations d'ajout, de suppression et de modification effectuées sur la table de notes, ainsi que les détails de ces opérations.
Audit des Notes
À chaque mise à jour de la table de notes, la moyenne de l'étudiant est recalculée selon la formule :

Moyenne = (Note * Coefficient) / Somme des Coefficients

Les actions effectuées sur les notes sont enregistrées dans la table audit_note, qui comprend les champs suivants :

Type d'opération
Date de mise à jour
Numéro d'étudiant
Nom
Matière
Note ancienne
Note nouvelle
Utilisateur
