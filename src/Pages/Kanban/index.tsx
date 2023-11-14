import { useEffect, useState } from 'react';
import { ReactSortable, SortableEvent } from 'react-sortablejs';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axios';
import ModalAddList from '../../components/Mouss/kanban/addListModal';
import List from '../../components/Mouss/kanban/list';
import { IListTemplate } from '../../@types/Home/kanban';

export default function Kanban() {
  const [lists, setLists] = useState([] as IListTemplate['list'][]);

  const fecthLists = async () => {
    try {
      const response = await axiosInstance.get('/kanban/lists');
      const { data } = response;
      data.sort((a: IListTemplate['list'], b: IListTemplate['list']) => a.position - b.position);
      setLists(data);
    } catch (error) {
      toast.error(`Error fetching lists: ${error}`);
    }
  };
  const updateListPosition = async (evt: SortableEvent) => {
    // Créer une copie de la liste actuelle
    const updatedLists = [...lists];
    // Obtenir l'ID de l'élément déplacé
    const movedListId = evt.item.id;
    const movedList = updatedLists.find((list) => Number(list.id) === Number(movedListId));
    if (movedList) {
      // Mettre à jour la position de l'élément déplacé
      movedList.position = Number(evt.newIndex) + 1;
      // Mettre à jour l'état
      try {
        await axiosInstance.put(`/kanban/lists/${movedListId}`, {
          position: movedList.position,
        });
        setLists(updatedLists.sort((a, b) => a.position - b.position));
      } catch (error) {
        toast.error(`Error updating lists: ${error}`);
      }
    }
  };

  useEffect(() => {
    fecthLists();
  }, []);

  return (
    <>
      <section>
        <div className="d-flex justify-content-between">
          <h1 className="title">oKanban</h1>
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
          <ReactSortable
            list={lists}
            setList={setLists}
            className="d-flex flex-row"
            onEnd={updateListPosition}
          >
            {lists.map((list) => (
              <List key={list.id} list={list} updateList={fecthLists} />
            ))}
          </ReactSortable>
        </div>
      </section>
      <ModalAddList updateLists={fecthLists} />
    </>
  );
}
