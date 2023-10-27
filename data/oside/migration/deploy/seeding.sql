-- Deploy oside:seeding to pg

BEGIN;

INSERT INTO public.role (label, color) VALUES
    ('user', '#808080'),
    ('modérateur', '#808080'),
    ('admin', '#808080'),
    ('Je sais plus', '#808080');

INSERT INTO public.techno (label, color) VALUES
    ('Angular', '#D2002F'),
    ('Docker', '#0069AD'),
    ('HTML', '#D84924'),
    ('CSS', '#F2F2F2'),
    ('React', '#61DAFB'),
    ('Node.js', '#43853D'),
    ('MongoDB', '#4DB33D'),
    ('Vue.js', '#41B883'),
    ('Firebase', '#FFCA28'),
    ('React Native', '#61DBFB'),
    ('Test3', '#F0F'),
    ('Test4', '#FFF'),
    ('Test 5', '#61DBFB'),
    ('Je sais plus', '#808080');

INSERT INTO public.user (email, first_name, last_name, github_login, role_id, created_at, updated_at, delete_at, last_visited) VALUES
	('lepriol.matthieu@gmail.com',	null,	null,	'Mimouss56', 3,	'2023-05-10 12:01:40.912412+02',	null,	null,	'2023-05-10 12:01:40.912412+02'),
	('christophe.gouteux@gmail.com',	null,	null,	'Sushiwie',	2,	'2023-05-10 12:01:40.912412+02',	null,	null,	'2023-05-10 12:01:40.912412+02'),
	('thomas.biguet@gmail.com',	null,	null,	'ThomasBiguet',	1,	'2023-05-10 12:01:40.912412+02',	null,	null,	'2023-05-10 12:01:40.912412+02'),
	('test@test.com',	null,	null,	'testeuGithub',	1,	'2023-05-10 12:25:36.228872+02',	'2023-05-10 12:34:44.169538+02',	'2023-05-10 13:09:28.177593+02',	'2023-05-10 12:25:36.228872+02');

INSERT INTO public.projet (title, content, status, owner_id) VALUES
    ( 'Un super projet', 'Moi je passe pas mal de temps à la taverne. J’ai jamais entendu parlé de celui-là! Ouais... Ouais je me suis gouré... Vous binez pas... Même nous on a pas tout compris.','En cours d équipage', 1),
    ( 'Projet qui tue', 'Oui.. Ben vous.. Occupez vous d’les faire ça s’ra déjà pas mal! Oui mais nous on est trois, enfin, deux et demi. Ben attendez, je vais vous rendre la vôtre. Ben c’est bien ce que j’ai dit! Provençal le Gaulois... le Galois... Ouais je vois ce que vous voulez dire..', 'Equipe au complet', 2),
    ( 'Le projet dans un projet', 'Non Provençal c’est mon nom. Moi, prochaine bataille rangée je reste à Kaamelott. Passer la tête? Pour me prendre une flêche dedans? Non merci!', 'Levez les voiles', 3),
    ( 'Projet génial', 'Ce projet est vraiment incroyable ! Nous avons fait un excellent travail.', 'En cours', 1),
    ( 'Projet fantastique', 'Ce projet est tout simplement fantastique ! Nous sommes très fiers du résultat.', 'En cours', 4),
    ( 'Projet de développement web',	'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget nisl vitae sapien vestibulum tempus vel et est. Suspendisse potenti. Integer non tristique tellus. Sed non fermentum lectus. Morbi pharetra, turpis at cursus interdum, lorem libero auctor velit, non vestibulum nunc magna vel magna. Nam nec velit euismod, dapibus felis a, malesuada sapien.', 'En cours de développement', 1),
    ( 'Application mobile de fitness', 'Sed in turpis id sem congue mollis. Sed varius neque eu sapien sagittis molestie. Duis convallis libero sed leo lacinia, ac aliquam lorem imperdiet. Suspendisse potenti. Proin at mauris sit amet dolor efficitur venenatis vel sit amet ex. Praesent pharetra vel nibh vel dictum. Nullam pretium ex a urna tincidunt, vel auctor velit dapibus.', 'En attente de validation', 2),
    ( 'Blabla', 'Sed in turpis id sem congue mollis. Sed varius neque eu sapien sagittis molestie. Duis convallis libero sed leo lacinia, ac aliquam lorem imperdiet. Suspendisse potenti. Proin at mauris sit amet dolor efficitur venenatis vel sit amet ex. Praesent pharetra vel nibh vel dictum. Nullam pretium ex a urna tincidunt, vel auctor velit dapibus.', 'Le vent dans les voiles',	3),
    ( 'A DELETE', 'M''en fout de ton avis je veux le delete', 'Chanson Mael', 1);


INSERT INTO public.techno_projet (techno_id, projet_id) VALUES
    (6, 8),
    (7, 8),
    (8, 8),
    (7, 9),
    (9, 9),
    (14, 9);
    
COMMIT;
