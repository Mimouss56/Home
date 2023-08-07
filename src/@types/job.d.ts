export interface Job {
  title: string;
  ent: string;
  date: {
    debut: string;
    fin: string;
  };
  lieu:{
    ville: string;
    departement: string;
  };
  description: string;
  competences: string[];
  url_img: string;
}
