
## Table User


|Champ  |Type   |Spécificités   |Description    |
| ------------- |:-------------:|:-------------:| -----:|

|vote_up|int|NOT NULL default 0| note positive de l'utilisateur |
|vote_down|int| NOT NULL default 0|note négative de l'utilisateur |



## Table Project


|Champ  |Type   |Spécificités   |Description    |
| ------------- |:-------------:|:-------------:| -----:|

|vote_up|int|NOT NULL| note positive du project |
|vote_down|NOT NULL| note négative du project |


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