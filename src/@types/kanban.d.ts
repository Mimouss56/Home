export interface IListTemplate {
  list: {
    id: string;
    name: string;
    cards : [ICardTemplate]
  };
}

export interface ICardTemplate {
  id: number;
  content: string;
  color: string;
  position: number;
  tags: [ITagTemplate];
}

export interface ITagTemplate {
  id: number;
  name: string;
  color: string;
}
