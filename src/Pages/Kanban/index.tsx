import { useEffect, useState } from 'react';
import ModalAddList from '../../components/Mouss/kanban/addListModal';
import axiosInstance from '../../utils/axios';
import List from '../../components/Mouss/kanban/list';
import { IListTemplate } from '../../@types/kanban';

export default function Kanban() {
  const [lists, setLists] = useState([] as IListTemplate['list'][]);

  const fecthLists = async () => {
    const response = await axiosInstance.get('/kanban/lists');
    const { data } = response;
    setLists(data);
  };

  useEffect(() => {
    fecthLists();
  }, []);

  return (
    <>
      <section>
        <div className="d-flex justify-content-between">
          <h1 className="title">
            oKanban
          </h1>

          <div className="column">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#addListModal"
            >
              <i className="bi bi-clipboard-plus p-2" />
              Ajouter une liste
            </button>
          </div>

        </div>

        <div className="d-flex col-12">
          {lists && lists.map((list) => (
            <List key={list.id} list={list} updateList={fecthLists} />
          ))}
        </div>
      </section>
      <ModalAddList updateLists={fecthLists} />

    </>
  );
}
