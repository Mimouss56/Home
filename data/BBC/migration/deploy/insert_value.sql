-- Deploy bbc:insert_values to pg

BEGIN;

INSERT INTO contrib (id, username, discord_id, email, is_admin, nom, prenom, created_at, updated_at) VALUES
(1, 'Mouss', '356821625984909313', 'lepriol.matthieu@gmail.com', TRUE , NULL, NULL, now(), NULL),
(2, 'LilCheak', '643190696228159516', 'axellekln@icloud.com', TRUE, NULL, NULL, now(), NULL),
(3, ' Belle ', '406239656359886848', 'zarasoa.crepin@gmail.com', FALSE, NULL, NULL, now(), NULL),
(4, 'LeFlo', '120525698648637440', 'lebigflo@gmail.com', FALSE, NULL, NULL, now(), NULL),
(5, 'RigoPlot', '398959444383236097', 'oazeess@gmail.com', TRUE, NULL, NULL, now(), NULL),
(6, '_lafouche_', '791419858348146738', 'tom.fouche@orange.fr', TRUE, NULL, NULL, now(), NULL),
(7, 'Fée Romone (PowerPR)', '281949987578052609', 'scolanamandine@gmail.com', TRUE, NULL, NULL, now(), NULL),
(8, ' Bulle ', '261908938897752065', 'bibi56890@hotmail.com', TRUE, NULL, NULL, now(), NULL),
(9, 'LetMeBe', '771447388123824138', 'yasmina.namisya@gmail.com', FALSE, NULL, NULL, now(), NULL),
(10, 'Red', '318838775012917258', 'jeffrait@hotmail.com', FALSE, NULL, NULL, now(), NULL),
(13, 'Edana', '808058742251323393', 'cecile.segaert@gmail.com', FALSE, NULL, NULL, now(), NULL),
(14, 'lulu5830', '713037340737536102', 'lucasmeckert67@gmail.com', FALSE, NULL, NULL, now(), NULL),
(15, 'Maskass', '890643882004602941', 'fabrice.chassatte@gmail.com', FALSE, NULL, NULL, now(), NULL),
(16, 'LordMojo', '784459018554048532', 'loremay8474@gmail.com', FALSE, NULL, NULL, now(), NULL),
(18, 'Nate ', '559314275957473291', 'naappscontact@gmail.com', FALSE, NULL, NULL, now(), NULL),
(21, 'levyniah', '305070182949191683', 'solennschmitt@live.fr', FALSE, NULL, NULL, now(), NULL),
(22, 'Nalou', '705545672950284350', 'ilona.brevet281@gmail.com', FALSE, NULL, NULL, now(), NULL),
(24, 'C4ptainWolf', '690601451340169257', 'mavrickrassart@gmail.com', FALSE, NULL, NULL, now(), NULL),
(25, 'Amnode', '765709772975505450', 'deblauwemanon@gmail.com', FALSE, NULL, NULL, now(), NULL),
(26, 'VeK', '472334901966798848', 'the-killer-lover@hotmail.fr', FALSE, NULL, NULL, now(), NULL),
(28, 'Öxy', '242627661086720000', 'hoshi-by_skyz0@live.fr', FALSE, NULL, NULL, now(), NULL),
(29, 'Kinder ', '665283442686164993', 'morganemarange@gmail.com', FALSE, NULL, NULL, now(), NULL),
(30, 'Horro', '285491137735819264', 'infearctus@gmail.com', FALSE, NULL, NULL, now(), NULL),
(31, 'la_sagne_bolo', '773903672903073805', 'ewen@mimouss.fr', FALSE, NULL, NULL, now(), NULL),
(32, 'Lycanthrope', '321306790463668224', 'fichot.bastien@gmail.com', FALSE, NULL, NULL, now(), NULL),
(33, 'Daibbality', '320490389113012236', 'auger-thomas@orange.fr', FALSE, NULL, NULL, now(), NULL),
(34, 'kitsune', '698615891729842317', 'ludoborderieux@outlook.fr', FALSE, NULL, NULL, now(), NULL),
(35, 'sushiwie', '996038585721561219', 'chris.gouteux@outlook.fr', FALSE, NULL, NULL, now(), NULL);

INSERT INTO bot (name, discord_id, price, cost, devise, reason) VALUES
('AutoMuteUs', '753795015830011944', '5.50', '0.00', '$', 'Suite inactivité passage en mode Free'),
('MEE6', '159985870458322944', '49.99', '4.17', '€', '49.99 Mensualisé'),
('TicketTool', '722196398635745312', '6.50', '0.00', '€', 'offert par Lafouche'),
('ChillBot', '793143330455420938', '0.00', '0.00', '€', '');


INSERT INTO don (user_id, montant, ref, type, created_at, updated_at, active) VALUES
(1, '10.00', '72508504KF6527916', 'Paypal', '2022-03-12 00:00:00', null, TRUE),
(3, '1.47', '77K653999B852233Y', 'Paypal', '2022-03-11 00:00:00', null, TRUE),
(4, '5.00', '1AF50318KY714050H', 'Paypal', '2022-03-11 14:08:06', null, TRUE),
(5, '10.00', '2W4811748Y7950209', 'Paypal', '2022-03-13 14:08:06', null, TRUE),
(8, '1.47', '7SN39116L7264923C', 'Paypal', '2022-03-13 14:08:06', null, TRUE),
(1, '-5.22', 'AutoMuteUs', 'PayPal', '2022-03-26', null, TRUE),
(13, '5.00', 'transfert', 'transfert', '2022-03-27 21:46:19', null, TRUE),
(14, '3.00', '1DC05502UM526014R', 'Paypal', '2022-03-27 21:57:08', null, TRUE),
(15, '10.00', '6JV2066802154110N', 'Paypal', '2022-04-01 21:53:38', null, TRUE),
(1, '-5.35', 'AutoMuteUs', 'Paypal', '2022-04-27 20:48:01', null, TRUE),
(1, '5.00', '11899260T4009364T', 'Paypal', '2022-04-29 19:21:15', null, TRUE),
(2, '10.00', '85S48810UM7895037', 'Paypal', '2022-05-08 21:33:44', null, TRUE),
(1, '-5.35', 'AutoMuteUs', 'Paypal', '2022-05-26 14:20:24', null, TRUE),
(3, '3.50', 'azerty', 'Paypal', '2022-06-05 18:14:50', null, TRUE),
(1, '-5.48', 'AutoMuteUs', 'Paypal', '2022-07-01 07:01:46', null, TRUE),
(1, '-49.99', 'Mee6', 'Paypal', '2022-07-23 12:31:43', null, TRUE),
(1, '20.00', 'azer', 'Paypal', '2022-07-23 12:32:28', null, TRUE),
(1, '-5.63', 'AutoMuteUs', 'Paypal', '2022-07-26 14:30:59', null, TRUE),
(4, '10.00', '7RS400556N555120N', 'Paypal', '2022-07-27 22:01:42', null, TRUE),
(3, '4.10', '7TV44134UY623114N', 'Paypal', '2022-08-01 01:07:52', null, TRUE),
(18, '5.00', '5FC47893VN859715L', 'Paypal', '2022-08-18 17:52:46', null, TRUE),
(1, '-5.63', 'AutoMuteUs', 'Paypal', '2022-08-25 16:56:58', null, TRUE),
(1, '-9.99', 'Nitro', 'Paypal', '2022-08-26 06:34:11', null, TRUE),
(1, '-5.63', 'AutoMuteUs', 'Paypal', '2022-09-26 12:34:44', null, TRUE),
(6, '25.00', '83B73151J7058092T', 'Paypal', '2022-09-28 20:26:37', null, TRUE),
(30, '5.00', 'Serveur Discord', 'Virement', '2022-10-19 21:17:44', null, TRUE),
(1, '-5.84', 'AutoMuteUs', 'Paypal', '2022-10-26 13:46:15', null, TRUE),
(25, '1.00', 'a saisir', 'Paypal', '2022-11-09 13:46:15', null, TRUE),
(32, '10.00', '4CT60770G17170738', 'Paypal', '2022-11-11 21:05:15', null, TRUE),
(14, '5.00', '26M10297Y5510924X', 'Paypal', '2022-11-11 22:00:00', null, TRUE),
(1, '-5.84', 'AutoMuteUs', 'Paypal', '2022-11-15 13:37:29', null, TRUE),
(21, '4.00', '09892572YY345324U', 'Paypal', '2022-11-15 13:37:29', null, TRUE),
(34, '2.00', 'transfert Levy -> Kitsune', 'transfert', '2022-11-15 13:37:29', null, TRUE),
(21, '-2.00', 'transfert Levy -> Kitsune', 'transfert', '2022-11-15 13:37:29', null, TRUE),
(1, '-5.58', 'AutoMuteUs', 'Paypal', '2022-11-26 15:28:15', null, TRUE),
(1, '-5.58', 'AutoMuteUs', 'Paypal', '2022-12-26 14:40:16', null, TRUE),
(1, '-5.32', 'AutoMuteUs', 'Paypal', '2023-01-26 21:36:09', null, TRUE),
(25, '1.00', '6X816016Y1940984V', 'Paypal', '2023-01-26 22:01:39', null, TRUE),
(1, '-5.48', 'AutoMuteUs', 'Paypal', '2023-02-26 23:11:54', null, TRUE),
(1, '-5.39', 'AutoMuteUs', 'Paypal', '2023-03-27 10:11:43', null, TRUE);

INSERT INTO donateur (user_id, solde, wish, part, created_at, updated_at) VALUES
(1, '9.54', 1, 2, '2023-03-27 10:54:05', '2023-03-27 11:30:01'),
(3, '1.65', 1, 1, '2023-03-27 10:54:05', '2023-03-27 11:30:01'),
(4, '4.66', 1, 1, '2023-03-27 10:54:05', '2023-03-27 11:30:01'),
(8, '0.00', 1, 0, '2023-03-27 10:54:05', '2023-03-27 10:54:05'),
(13, '0.00', 1, 0, '2023-03-27 10:54:05', '2023-03-27 10:54:05'),
(14, '2.47', 1, 1, '2023-03-27 10:54:05', '2023-03-27 11:30:01'),
(15, '1.27', 1, 1, '2023-03-27 10:54:05', '2023-03-27 11:30:01'),
(2, '1.27', 1, 1, '2023-03-27 10:54:05', '2023-03-27 11:30:01'),
(6, '13.08', 1, 3, '2023-03-27 10:54:05', '2023-03-27 11:30:01'),
(18, '1.18', 1, 1, '2023-03-27 10:54:05', '2023-03-27 10:54:05'),
(30, '1.47', 1, 1, '2023-03-27 10:54:05', '2023-03-27 11:30:01'),
(32, '5.54', 1, 1, '2023-03-27 10:54:05', '2023-03-27 11:30:01'),
(21, '0.00', 1, 1, '2023-03-27 10:54:05', '2023-03-27 10:54:05'),
(34, '0.00', 1, 1, '2023-03-27 10:54:05', '2023-03-27 10:54:05'),
(25, '0.00', 1, 1, '2023-03-27 10:54:05', '2023-03-27 10:54:05')
;


INSERT INTO sanction (discord_id, type, reason, author, created_at) VALUES
( 157929653623980032, 1, 'langages inapproprié', 1, '2022-12-12 00:40:07'),
( 205684747458838528, 1, 'comportement inacceptable', 1, '2022-12-12 00:40:07'),
( 471707441206132745, 1, 'comportement inacceptable', 1, '2022-12-12 00:40:07'),
( 205684747458838528, 1, 'Comportement et langage inapproprié, nous sommes en communauté, n''impose pas tes règles.', 2, '2022-12-12 00:40:07'),
( 757985216785547364, 3, 'Raison modo', 5, '2022-12-12 00:40:07'),
( 795648271116271626, 3, 'Pas de raison connue!!', 5, '2022-12-12 00:40:07'),
( 824562399511838731, 3, 'Troll ouvert sur le serveur', 5, '2022-12-12 00:40:07'),
( 919756518407163935, 3, 'Troll ouvert sur le serveur', 5, '2022-12-12 00:40:07'),
( 989285785012416563, 3, 'Pas de raison connue!!', 1, '2022-12-12 00:40:07'),
( 120525698648637440, 1, 'Création d''un ticket Troll', 1, '2022-12-12 21:40:44');

UPDATE sanction SET deleted_at = '2022-12-25 00:00:00' WHERE id = 12;

COMMIT;
