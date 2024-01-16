import { useEffect, useState } from 'react';
import { SortableEvent } from 'react-sortablejs';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axios';
import { IListTemplate } from '../../@types/Home/kanban';

const useKanbanLists = () => {
  const [lists, setLists] = useState([] as IListTemplate['list'][]);

  const fetchLists = async () => {
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
    const updatedLists = [...lists];
    const movedListId = evt.item.id;
    const movedList = updatedLists.find((list) => Number(list.id) === Number(movedListId));

    if (movedList) {
      movedList.position = Number(evt.newIndex) + 1;

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
    fetchLists();
  }, []);

  return {
    lists,
    setLists,
    fetchLists,
    updateListPosition,
  };
};

export default useKanbanLists;
