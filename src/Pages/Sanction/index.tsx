import { useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axios';
import { excerpt } from '../../utils/main';
import { ISanction } from '../../@types/Home/sanction';
import ModalAddSanction from '../../components/Modal/Sanction/formSanction';
import ModalViewDetails from '../../components/Modal/Sanction/viewSanction';
import SectionLayout from '../../layout/SectionLayout';
import { userContext } from '../../store/user.context';

dayjs.extend(isoWeek);
const initMaxSanction = 10;
function Sanction() {
  const { user } = useContext(userContext);
  const [sanctionList, setSanctionList] = useState<ISanction[]>([]);
  const [nbMaxSanction, setNbMaxSanction] = useState<number>(initMaxSanction);

  const fetchData = async (idRole: number) => {
    try {
      const { data } = await axiosInstance.get('/api/home/sanction');
      const updatedData = data.map((sanction: ISanction) => {
        if (
          idRole !== 1
          && sanction.date
          && sanction.date.week >= dayjs().isoWeek()
          && sanction.date.year >= dayjs().year()) {
          return { ...sanction, label: '**********' };
        }
        return sanction;
      });

      setSanctionList(updatedData);
    } catch (error) {
      toast.error(`Error fetching sanction: ${error}`);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const result = await axiosInstance.delete(`/api/home/sanction/${id}`);
      setSanctionList((prev) => prev.filter((sanction) => sanction.id !== id));
      toast.success(result.data.message);
    } catch (error) {
      toast.error(`Error deleting sanction: ${error}`);
    }
  };
  const handleAddElement = () => {
    if (user) fetchData(user?.role.id);
  };

  useEffect(() => {
    if (user) fetchData(user.role.id);
  }, [user]);

  return (
    <>
      <ModalViewDetails />
      <ModalAddSanction onAddElement={handleAddElement} />
      <SectionLayout idName="sanction" title="Liste des Sanctions" addButton="ModalAddSanction">
        <div className="table-responsive min-vh-100 mt-5">
          <table className="table table-striped table-sm text-center">
            <thead>
              <tr>
                <th scope="col" />
                <th />
                <th scope="col">Description</th>
                <th scope="col">Week</th>
                <th scope="col">Auteur</th>
                {user?.role.id === 1 && (
                  <>
                    <th scope="col">Enfant</th>
                    <th scope="col">Actions</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {sanctionList
                .filter((sanction) => {
                  if (user?.role.id !== 1) return sanction.child?.id === user?.id; return sanction;
                })
                .slice(0, nbMaxSanction)
                .map((sanction) => (
                  <tr
                    key={sanction.id}
                    className={`sanction-item ${sanction.warn ? 'table-danger' : ''} overflow-hidden `}
                    style={{
                      transition: 'max-height 0.5s ease-in-out',
                    }}
                  >
                    <td>
                      <button
                        type="button"
                        className="btn btn-warning mx-1"
                        data-bs-toggle="modal"
                        data-bs-target="#modalViewSanction"
                        data-bs-id={sanction.id}
                      >
                        <i className="bi bi-eye" />
                      </button>
                    </td>
                    <td>
                      {
                        !sanction.read && user?.role.id !== 1 && (
                          <span className="badge bg-danger-subtle border border-danger-subtle text-danger-emphasis rounded-pill">New</span>)
                      }
                    </td>
                    <td>
                      {excerpt(sanction.label)}
                    </td>
                    <td>
                      {`S${sanction.date?.week}/${sanction.date?.year}`}
                    </td>
                    <td>
                      {sanction.author?.username}
                    </td>

                    {
                      user?.role.id === 1 && (
                        <>
                          <td className="text-capitalize">{sanction.child?.username.toLowerCase()}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-warning mx-1"
                              data-bs-toggle="modal"
                              data-bs-target="#ModalAddSanction"
                              data-bs-id={sanction.id}
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
                      )
                    }
                  </tr>
                ))}
              <tr>
                <td colSpan={7}>
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => setNbMaxSanction((prevMax) => prevMax + 5)}
                  >
                    Voir plus
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </SectionLayout>
    </>
  );
}

export default Sanction;
