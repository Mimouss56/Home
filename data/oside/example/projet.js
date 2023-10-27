const data = [
  {
    id: 1,
    title: 'Un super projet',
    author: {
      id: 1,
      pseudo: 'SuperCodeur',
    },
    content: 'Moi je passe pas mal de temps à la taverne. J’ai jamais entendu parlé de celui-là! Ouais… Ouais je me suis gouré… Vous binez pas… Même nous on a pas tout compris.',
    member_projet: [],
    techno_projet: [
      {
        id: 1,
        label: 'JavaScript',
      },
      {
        id: 1,
        label: 'PHP',
      },
      {
        id: 1,
        label: 'HTML',
      },
    ],
    created_at: '2013-11-01',
    status: "En cours d'équipage",
  },
  {
    id: 2,
    title: 'Projet qui tue',
    author: {
      id: 2,
      pseudo: 'PHPMan',
    },
    content: 'Oui… Ben vous… Occupez vous d’les faire ça s’ra déjà pas mal! Oui mais nous on est trois, enfin, deux et demi. Ben attendez, je vais vous rendre la vôtre. Ben c’est bien ce que j’ai dit! Provençal le Gaulois… le Galois… Ouais je vois ce que vous voulez dire…',
    member_projet: [
      {
        id: 3,
        pseudo: 'Sir Arthur',
      },
      {
        id: 2,
        pseudo: 'SuperCodeur',
      },
    ],
    techno_projet: [
      {
        id: 1,
        label: 'Laravel',
      },
      {
        id: 1,
        label: 'Angular',
      },
      {
        id: 1,
        label: 'Docker',
      },
    ],
    created_at: '2013-11-01',
    status: 'Equipe au complet',
  },
  {
    id: 3,
    title: 'Le projet dans un projet',
    author: {
      id: 3,
      pseudo: 'Sir Arthur',
    },
    content: 'Non Provençal c’est mon nom. Moi, prochaine bataille rangée je reste à Kaamelott. Passer la tête? Pour me prendre une flêche dedans? Non merci!',
    member_projet: [
      {
        id: 1,
        pseudo: 'SuperCodeur',
      },
    ],
    techno_projet: [
      {
        id: 1,
        label: 'HTML',
      },
      {
        id: 1,
        label: 'CSS',
      },
      {
        id: 1,
        label: 'Docker',
      },
    ],
    created_at: '2013-11-01',
    status: 'Levez les voiles',
  },
];
module.exports = data;
