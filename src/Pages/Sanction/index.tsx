import { useState } from 'react';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axios';
import { excerpt } from '../../utils/main';
import ModalAddSanction from '../../components/Modal/Sanction/formSanction';
import ModalViewDetails from '../../components/Modal/Sanction/viewSanction';
import SectionLayout from '../../layout/SectionLayout';
import SwitchButton from '../../components/Form/Switch';
import { INotif } from '../../@types/notifToast';
import useMeStore from '../../store/me.store';
import useSanctionStore, { SanctionLoader } from '../../store/sanction.store';

dayjs.extend(advancedFormat);
dayjs.extend(isoWeek);
const initMaxSanction = 10;

function Sanction() {
  const { me: user } = useMeStore((state) => state);
  const { sanctions, fetchSanctions, deleteSanction } = useSanctionStore((state) => state);
  const [nbMaxSanction, setNbMaxSanction] = useState<number>(initMaxSanction);
  const dataNotif = JSON.parse(sessionStorage.getItem('dataNotif') || '[]') as INotif[];

  const handleCheck = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, id } = e.target;
    const idSanction = parseInt(id.split('-')[1], 10);
    try {
      const result = await axiosInstance.patch(`/api/home/sanction/${idSanction}/paid`, { paid: checked });
      fetchSanctions();
      toast.success(result.data.message);
    } catch (error) {
      toast.error(`Error updating sanction: ${error}`);
    }
  };
  const handleRead = async (id: number) => {
    try {
      await axiosInstance.put(`/api/home/sanction/${id}/read`);
      const updatedData = dataNotif.map((notif) => {
        if (notif.id === id) {
          return { ...notif, read: true };
        }
        return notif;
      });
      sessionStorage.setItem('dataNotif', JSON.stringify(updatedData));
    } catch (error) {
      toast.error(`Erreur lors de la lecture de la notification: ${error}`);
    }
  };

  return (
    <>
      {sanctions.length === 0 && <SanctionLoader />}
      <ModalViewDetails />
      <ModalAddSanction onAddElement={fetchSanctions} />
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
                        onClick={() => handleRead(sanction.id)}
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
                      {user?.role.id === 1 && (
                        <SwitchButton
                          name="paid"
                          checked={sanction.paid ?? false}
                          onChange={handleCheck}
                          color="success"
                          id={`switch-${sanction.id}`}
                        />
                      )}
                      {user?.role.id !== 1 && (<i className={`bi bi-${sanction.paid ? 'check-circle-fill text-success' : 'x-circle-fill text-danger'}`} />)}

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
                              onClick={() => deleteSanction(sanction.id)}
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
                <td colSpan={8}>
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
