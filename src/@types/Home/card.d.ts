import { Author } from './user';

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

export interface ICardNews {
  id: number;
  title: string;
  content: string;
  author : Author
}
