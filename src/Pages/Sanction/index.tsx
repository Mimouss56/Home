import { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axios';
import ModalAdd from '../../components/Modal/formSanction';
import ModalView from '../../components/Modal/viewSanction';
import { excerpt } from '../../utils/main';
import { ValueTargetForm } from '../../@types/event';
import { ICreateSanction, ISanction } from '../../@types/Home/sanction';

dayjs.extend(isoWeek);

function Sanction() {
  const [sanctionList, setSanctionList] = useState<ISanction[]>([]);
  const [filterSanctionList, setFilterSanctionList] = useState<ISanction[]>([]);
  const [currentSanction, setCurrentSanction] = useState(null as ICreateSanction | null);
  const [showInputChild, setShowInputChild] = useState<boolean>(false);
  const [listChild, setListChild] = useState([] as { id: number; username: string }[]);
  const [showInputWeek, setShowInputWeek] = useState<boolean>(false);
  const [listWeek, setListWeek] = useState([] as number[]);

  const user = JSON.parse(sessionStorage.getItem('user') || '{}');

  const makeListChild = (allSanction: ISanction[]) => {
    const arrayChild = [] as { id: number; username: string }[];
    allSanction.forEach((sanction: ISanction) => {
      const { id, username } = sanction.child;
      if (!arrayChild.find((child) => child.id === id)) {
        arrayChild.push({ id: Number(id), username });
      }
      return arrayChild;
    });
    setListChild(arrayChild);
  };

  const makeListWeek = (allSanction: ISanction[]) => {
    const arrayWeek = [] as number[];

    allSanction.forEach((sanction: ISanction) => {
      const { week } = sanction.date;

      if (!arrayWeek.find((weekValue) => Number(weekValue) === week)) {
        arrayWeek.push(week);
      }
      return arrayWeek;
    });
    setListWeek(arrayWeek);
  };

  const fetchLists = useCallback(async () => {
    try {
      const response = await axiosInstance.get('/home/sanction');
      const { data } = response;
      makeListChild(data);
      makeListWeek(data);
      const result = data
        .sort((a: ISanction, b: ISanction) => (a.date.complete < b.date.complete ? 1 : -1))
        .map((s: ISanction) => {
          if (user.child && dayjs().isoWeek() === s.date.week) {
            return { ...s, label: '************' };
          }
          return s;
        });
      makeListChild(result);
      makeListWeek(result);

      setSanctionList(result);
      setFilterSanctionList(result);
    } catch (error) {
      toast.error(`Error fetching lists: ${error}`);
    }
  }, [user.child]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { content, childId, warn } = e.target as typeof e.target & {
      content: ValueTargetForm;
      childId: ValueTargetForm;
      warn: { checked: boolean };
    };

    const inputData = {
      warn: warn.checked,
      id_child: Number(childId.value),
      label: content.value,
    };
    if (currentSanction) {
      try {
        const newSanction = { ...currentSanction, ...inputData } as ISanction;
        const result = await axiosInstance.put(`/home/sanction/${currentSanction.id}`, inputData);
        const index = sanctionList.findIndex((news) => news.id === currentSanction.id);
        sanctionList[index] = newSanction;
        // setSanctionList(sanctionList);
        toast.info(result.data.message);
      } catch (err) {
        const { response } = err as { response: { data: { message: string } } };

        toast.warning(response.data.message);
      }
    } else {
      try {
        const result = await axiosInstance.post('/home/sanction', inputData);

        setSanctionList((prev) => [...prev, result.data.data]);
        toast.success(result.data.message);
      } catch (err) {
        const { response } = err as { response: { data: { message: string } } };
        toast.warning(response.data.message);
      }
    }
    setCurrentSanction(null);
    // fetchLists();
  };

  const handleDelete = async (id: number) => {
    const result = await axiosInstance.delete(`/home/sanction/${id}`);
    setSanctionList(sanctionList.filter((sanction) => sanction.id !== id));
    toast.success(result.data.message);
  };

  useEffect(() => {
    fetchLists();
  }, [fetchLists]);

  const appyFilter = (value: string, type: string): void => {
    if (type === 'week') {
      setShowInputWeek(false);
      setFilterSanctionList(
        sanctionList.filter((sanction) => sanction.date.week === Number(value)),
      );
      return;
    }

    if (type === 'child') {
      setShowInputChild(false);
      setFilterSanctionList(
        sanctionList.filter((sanction) => sanction.child.id === Number(value)),
      );
      return;
    }
    setFilterSanctionList(sanctionList);
  };
  return (
    <article>
      <div className="d-flex justify-content-between">
        <h1>Liste des Sanctions</h1>

        {user.role.id === 1 && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => setCurrentSanction(null)}
            data-bs-toggle="modal"
            data-bs-target="#ModalAddSanction"
          >
            Ajout d&apos;une sanction
          </button>
        )}
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-sm text-center ">
          <thead>
            <tr>
              <th scope="col">Description</th>
              <th scope="col">
                {showInputWeek && (
                  <select
                    name="week"
                    id="week"
                    className="form-select w-auto m-0 pl-4"
                    onChange={
                      (e) => {
                        const target = e.target as HTMLSelectElement;
                        appyFilter(target.value, 'week');
                      }
                    }
                  >
                    <option value="all">Tout</option>
                    {listWeek && listWeek.map((week) => (
                      <option key={week} value={week}>{week}</option>
                    ))}
                  </select>
                )}
                {!showInputWeek && (
                  <>
                    <button
                      type="button"
                      className="btn bi bi-funnel-fill p-0"
                      onClick={() => setShowInputWeek(true)}
                    />
                    Week
                  </>
                )}

              </th>
              <th scope="col">Auteur</th>
              {user.role.id === 1 && (
                <>
                  <th scope="col">
                    {showInputChild && (
                      <select
                        name="child"
                        id="child"
                        className="form-select w-auto"
                        onChange={(e) => appyFilter(e.target.value, 'child')}
                        defaultValue="all"
                      >
                        <option value="all">Tout</option>
                        {listChild && listChild.map((children) => (
                          <option
                            key={children.id}
                            value={children.id}
                          >
                            {children.username}

                          </option>
                        ))}
                      </select>
                    )}
                    {!showInputChild && (
                      <>
                        <button
                          type="button"
                          className="btn bi bi-funnel-fill p-0"
                          onClick={() => setShowInputChild(true)}
                        />
                        Enfant
                      </>
                    )}

                  </th>
                  <th scope="col">Actions</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {filterSanctionList.map((sanction) => (

              <tr
                key={sanction.id}
                className={
                  (sanction.warn === true) ? 'table-danger' : ''
                }
                onClick={() => setCurrentSanction(sanction)}
                data-bs-toggle="modal"
                data-bs-target="#modalViewSanction"
                data-bs-sanction-id={sanction.id}
              >
                <td>
                  {excerpt(sanction.label)}

                </td>
                <td>{`S${sanction.date.week}/${sanction.date.year}`}</td>
                <td>{sanction.author.username}</td>
                {user.role.id === 1 && (
                  <>
                    <td className="text-capitalize">{sanction.child.username.toLowerCase()}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-warning mx-1"
                        onClick={() => setCurrentSanction(sanction)}
                        data-bs-toggle="modal"
                        data-bs-target="#ModalAddSanction"
                      >
                        <i className="bi bi-pencil" />
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger mx-1"
                        onClick={() => handleDelete(sanction.id)}
                      >
                        <i className="bi bi-trash3" />
                      </button>
                    </td>
                  </>
                )}

              </tr>
            ))}
          </tbody>
        </table>

      </div>
      {
        currentSanction && (
          <div
            className="modal fade "
            id="modalViewSanction"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <ModalView sanction={currentSanction as ISanction} />
          </div>
        )
      }
      {/* Bootstrap Modal */}
      <div className="modal" tabIndex={-1} id="ModalAddSanction">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{currentSanction ? 'Edit News' : 'Add News'}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              />
            </div>
            <form onSubmit={handleSubmit}>
              <ModalAdd sanction={currentSanction} />
            </form>
          </div>
        </div>
      </div>

    </article>

  );
}

export default Sanction;
