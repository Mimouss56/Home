import { useContext, useState } from 'react';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axios';
import { excerpt } from '../../utils/main';
import ModalAddSanction from '../../components/Modal/Sanction/formSanction';
import ModalViewDetails from '../../components/Modal/Sanction/viewSanction';
import SectionLayout from '../../layout/SectionLayout';
import { userContext } from '../../store/user.context';
import { sanctionsContext } from '../../store/sanction.context';

dayjs.extend(advancedFormat);
dayjs.extend(isoWeek);
const initMaxSanction = 10;
function Sanction() {
  const { user } = useContext(userContext);
  const { sanctions, setSanctions } = useContext(sanctionsContext);
  const [nbMaxSanction, setNbMaxSanction] = useState<number>(initMaxSanction);

  const handleDelete = async (id: number) => {
    try {
      const result = await axiosInstance.delete(`/api/home/sanction/${id}`);
      const newListSanctions = sanctions.filter((sanction) => sanction.id !== id);
      setSanctions(newListSanctions);
      toast.success(result.data.message);
    } catch (error) {
      toast.error(`Error deleting sanction: ${error}`);
    }
  };
  const handleAddElement = () => {
    if (user?.role.id === 1) {
      // on ajoute la nouvelle sanction à la liste dans le store
      setSanctions(sanctions);
    }
  };

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
                <th scope="col">Payé</th>
                {user?.role.id === 1 && (
                  <>
                    <th scope="col">Enfant</th>
                    <th scope="col">Actions</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {sanctions
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
                      {`S${dayjs(sanction.created_at).isoWeek()}/${dayjs(sanction.created_at).isoWeekYear()}`}
                    </td>
                    <td>
                      {sanction.author?.username}
                    </td>
                    <td>
                      {sanction.paid ? <i className="bi bi-check2" /> : <i className="bi bi-x" />}
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
