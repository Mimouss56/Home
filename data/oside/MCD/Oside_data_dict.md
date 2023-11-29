## Table Rôle

|Champ  |Type   |Spécificités   |Description    |
| ------------- |:-------------:|:-------------:| -----:|
|id|int|GENERATED ALWAYS AS IDENTITY PRIMARY KEY| identifiant d'un role|
|label|text|NOT NULL| nom complet du role|
|color|VARCHAR(8)|DEFAULT '808080' CHECK REGEX| Couleur d'un role par défaut gris|


## Table User


|Champ  |Type   |Spécificités   |Description    |
| ------------- |:-------------:|:-------------:| -----:|
|id|int|GENERATED ALWAYS AS IDENTITY PRIMARY KEY| identifiant d'un user|
|email|text|NOT NULL| adresse email d'un utilisateur|
|first_name|text|| prénom d'un utilisateur|
|last_name|text|| nom d'un utilisateur|
|github_login|text|NOT NULL| pseudo github d'un utilisateur|
|role_id|int|NOT NULL default 1| identifiant du rôle|
|vote_up|int|NOT NULL default 0| note positive de l'utilisateur |
|vote_down|int| NOT NULL default 0|note négative de l'utilisateur |
|created_at|timestampz|NOT NULL DEFAULT NOW()| Date de création de l'utilisateur|
|updated_at|timestampz| | Date de modification de l'utilisateur|
|delete_at|timestampz| |Date de suppression de l'utilisateur|
|last_visited|timestampz|NOT NULL DEFAULT NOW()| Date de création de l'utilisateur|


## Table Techno


|Champ  |Type   |Spécificités   |Description    |
| ------------- |:-------------:|:-------------:| -----:|
|id|int|GENERATED ALWAYS AS IDENTITY PRIMARY KEY| identifiant d'une technologie|
|label|text|NOT NULL| nom complet du technologie|
|color|VARCHAR(8)|DEFAULT '808080' CHECK REGEX| Couleur d'une technologie par défaut gris|


## Table Project


|Champ  |Type   |Spécificités   |Description    |
| ------------- |:-------------:|:-------------:| -----:|
| id | int | GENERATED ALWAYS AS IDENTITY PRIMARY KEY | identifiant du project|
| title | text | NOT NULL | Titre du projet |
|content|text|NOT NULL| description complete du projet|
|status|text|| Etat actuel du projet|
|vote_up|int|NOT NULL| note positive du project |
|vote_down|NOT NULL| note négative du project |
|owner_id|INT|NOT NULL| propriétaire du projet|
|created_at|timestampz|NOT NULL| Date de création du project|
|updated_at|timestampz| | Date de modification du project|
|delete_at|timestampz| |Date de suppression du project|


## Table Member_projet


|Champ  |Type   |Spécificités   |Description    |
| ------------- |:-------------:|:-------------:| -----:|
| user_id | int | NOT NULL PRIMARY KEY | identifiant d'un user|
| projet_id | int | NOT NULL PRIMARY KEY | identifiant d'un projet|


## Table Skill


|Champ  |Type   |Spécificités   |Description    |
| ------------- |:-------------:|:-------------:| -----:|
| user_id | int | NOT NULL PRIMARY KEY | identifiant d'un user|
| projet_id | int | NOT NULL PRIMARY KEY | identifiant d'un projet|


## Table Techno_projet


|Champ  |Type   |Spécificités   |Description    |
| ------------- |:-------------:|:-------------:| -----:|
| projet_id | int | NOT NULL PRIMARY KEY | identifiant d'un projet|
| techno_id | int | NOT NULL PRIMARY KEY | identifiant d'une technologie|


## Table Comment


|Champ  |Type   |Spécificités   |Description    |
| ------------- |:-------------:|:-------------:| -----:|
| id | int | GENERATED ALWAYS AS IDENTITY PRIMARY KEY | identifiant du commentaire|
| user_id | int | NOT NULL PRIMARY KEY | identifiant d'un user|
| projet_id | int | NOT NULL PRIMARY KEY | identifiant d'un projet|
|content|text|NOT NULL| description complete du commentaire|
|flag|Boolean |NOT NULL DEFAULT 0 | Signalement d'un commentaire|
|created_at|timestampz|NOT NULL| Date de création du commentaire|
|updated_at|timestampz| | Date de modification du commentaire|
|delete_at|timestampz| |Date de suppression du commentaire|


## Table Avis


|Champ  |Type   |Spécificités   |Description    |
| ------------- |:-------------:|:-------------:| -----:|
| id | int | GENERATED ALWAYS AS IDENTITY PRIMARY KEY | identifiant du commentaire|
|content|text|NOT NULL| description complete du commentaire|
|flag|Boolean |NOT NULL DEFAULT 0 | Signalement d'un commentaire|
| user_id | int | NOT NULL PRIMARY KEY | identifiant d'un user|
| poster_id | int | NOT NULL PRIMARY KEY | identifiant de l'auteur du commentaire|
|created_at|timestampz|NOT NULL| Date de création du commentaire|
|updated_at|timestampz| | Date de modification du commentaire|
|delete_at|timestampz| |Date de suppression du commentaire|