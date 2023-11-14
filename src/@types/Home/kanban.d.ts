export interface IListTemplate {
  list: {
    id: string;
    name: string;
    position: number;
    cards : [ICardTemplate]
  };
}

export interface ICardTemplate {
  id: number;
  content: string;
  color: string;
  position: number;
  tags: [ITagTemplate];
  listId: string;
  list_id?: string;
}

export interface ITagTemplate {
  id: number;
  name: string;
  color: string;
}
