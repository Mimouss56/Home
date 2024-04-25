import { useEffect, useState } from 'react';
import { ReactSortable, SortableEvent } from 'react-sortablejs';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axios';
import ModalAddList from '../../components/Modal/Kanban/formListKanban';
import List from '../../components/Kanban/list';
import { IListTemplate } from '../../@types/Home/kanban';
import SectionLayout from '../../layout/SectionLayout';

export default function Kanban() {
  const [lists, setLists] = useState([] as IListTemplate['list'][]);
  const idName = 'kanban';

  const fecthLists = async () => {
    try {
      const response = await axiosInstance.get('/api/kanban/lists');
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
        await axiosInstance.put(`/api/kanban/lists/${movedListId}`, {
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
      <SectionLayout
        idName={idName}
        title="oKanban"
        addButton="addListModal"
      >
        <div className="vh-100 w-75 mx-auto">
          <ReactSortable
            list={lists}
            setList={setLists}
            className="d-flex flex-wrap justify-content-between align-content-between"
            onEnd={updateListPosition}
          >
            {lists.map((list) => (
              <List key={list.id} list={list} updateList={fecthLists} />
            ))}
          </ReactSortable>
        </div>
      </SectionLayout>

      <ModalAddList updateLists={fecthLists} />
    </>
  );
}
