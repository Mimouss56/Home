import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axios';
import { excerpt } from '../../utils/main';
import { ISanction } from '../../@types/Home/sanction';
import ModalAddSanction from '../../components/Modal/Sanction/formSanction';
import ModalViewDetails from './viewSanction';
import SectionLayout from '../../layout/SectionLayout';
import useScrollSection from '../../hook/useScrollSection';

dayjs.extend(isoWeek);

function Sanction() {
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');
  const [sanctionList, setSanctionList] = useState<ISanction[]>([]);
  useScrollSection('sanction');

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
    fetchData(user.role.id);
  };

  useEffect(() => {
    fetchData(user.role.id);
  }, [user.role.id]);

  return (
    <>
      <ModalViewDetails />
      <ModalAddSanction onAddElement={handleAddElement} />
      <SectionLayout idName="sanction" title="Liste des Sanctions" addButton="ModalAddSanction">
        <div className="table-responsive">
          <table className="table table-striped table-sm text-center">
            <thead>
              <tr>
                <th />
                <th scope="col">Description</th>
                <th scope="col">Week</th>
                <th scope="col">Auteur</th>
                {user.role.id === 1 && (
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
                  if (user.role.id !== 1) return sanction.child?.id === user.id; return sanction;
                })
                .map((sanction) => (
                  <tr
                    key={sanction.id}
                    className={sanction.warn ? 'table-danger' : ''}
                  >
                    <td
                      data-bs-toggle="modal"
                      data-bs-target="#modalViewSanction"
                      data-bs-id={sanction.id}
                    >
                      {
                        !sanction.read && user.role.id !== 1 && (
                          <span className="badge bg-danger-subtle border border-danger-subtle text-danger-emphasis rounded-pill">New</span>)
                      }
                    </td>
                    <td
                      data-bs-toggle="modal"
                      data-bs-target="#modalViewSanction"
                      data-bs-id={sanction.id}
                    >
                      {excerpt(sanction.label)}
                    </td>
                    <td
                      data-bs-toggle="modal"
                      data-bs-target="#modalViewSanction"
                      data-bs-id={sanction.id}
                    >
                      {`S${sanction.date?.week}/${sanction.date?.year}`}
                    </td>
                    <td
                      data-bs-toggle="modal"
                      data-bs-target="#modalViewSanction"
                      data-bs-id={sanction.id}
                    >
                      {sanction.author?.username}
                    </td>
                    {
                      user.role.id === 1 && (
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
            </tbody>
          </table>
        </div>
      </SectionLayout>
    </>
  );
}

export default Sanction;
