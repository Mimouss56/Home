export interface ICard {
  id: number;
  ent: string;
  title: string;
  desc: string;
  url_img: string;
  date : {
    debut : string;
    fin : string;
  }
  competences : string[];
}
