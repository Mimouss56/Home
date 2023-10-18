import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../../utils/axios';
import { ErrorSanctionProps } from '../../../@types/error';
import { IStudent, IcreateStudent } from '../../../@types/ESA/student';
import { ValueTargetForm } from '../../../@types/event';
import ModalViewStudent from './modalViewChild';

function ListStudents() {
  const [students, setStudents] = useState<IStudent[]>([]);
  const [currentStudent, setCurrentStudent] = useState(null as IStudent | null);

  const listClass = ['TPS', 'PS', 'MS', 'GS', 'CP', 'CE1', 'CE2', 'CM1', 'CM2'];

  const fetchUsers = async () => {
    const response = await axiosInstance.get('/esa/child/');
    setStudents(response.data);
  };
  const handleEdit = (student: IStudent) => {
    setCurrentStudent(student);
  };
  const handleDelete = async (id: number) => {
    const result = await axiosInstance.delete(`/esa/child/${id}`);
    setStudents(students.filter((student) => student.id !== id));
    toast.success(result.data.message);
  };
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const { class, childId, warn } = e.target as typeof e.target & {
  //     class: ValueTargetForm;
  //     childId: ValueTargetForm;
  //     warn: { checked: boolean };
  //   };

  //   const inputData = {
  //     warn: warn.checked,
  //     id_child: Number(childId.value),
  //     label: content.value,
  //   };
  //   if (currentSanction) {
  //     try {
  //       const newSanction = { ...currentSanction, ...inputData } as ISanction;
  //       const result = await axiosInstance.put(`/sanction/${currentSanction.id}`, inputData);
  //       const index = sanctionList.findIndex((news) => news.id === currentSanction.id);
  //       sanctionList[index] = newSanction;
  //       // setSanctionList(sanctionList);
  //       toast.info(result.data.message);
  //     } catch (err) {
  //       const { response } = err as { response: { data: { message: string } } };

  //       toast.warning(response.data.message);
  //     }
  //   } else {
  //     try {
  //       const result = await axiosInstance.post('/sanction', inputData);

  //       setSanctionList((prev) => [...prev, result.data.data]);
  //       toast.success(result.data.message);
  //     } catch (err) {
  //       const { response } = err as { response: { data: { message: string } } };
  //       toast.warning(response.data.message);
  //     }
  //   }
  //   setCurrentSanction(null);
  //   fetchListSanction(url);
  // };
  // const handleChangeClass = async (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   try {
  //     await axiosInstance.put(`/esa/child/${event.target.id}`, {
  //       class: event.target.value,
  //     });
  //     fetchUsers();
  //   } catch (error) {
  //     const { response } = error as ErrorSanctionProps;
  //     toast.error(`🦄 ${response.data.error || response.data.message} ! `);
  //   }
  // };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <article>
      <div className="d-flex justify-content-between">
        <h1>Liste des Elèves</h1>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => setCurrentStudent(null)}
          data-bs-toggle="modal"
          data-bs-target="#ModalAddStudent"
        >
          Ajout d&apos;un élève
        </button>

      </div>
      <div className="table-responsive">
        <table className="table table-responsive-sm table-hover table-bordered">
          <thead>
            <tr>
              <th scope="col">Prénom</th>
              <th scope="col">Nom</th>
              <th scope="col">Classe</th>
              <th scope="col">Parent 1 </th>
              <th scope="col">Parent 2 </th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student: IStudent) => (
              <tr
                key={student.id}
              >
                <td
                  onClick={() => handleEdit(student)}
                  data-bs-toggle="modal"
                  data-bs-target="#modalViewStudent"
                >
                  {student.first_name}

                </td>
                <td
                  onClick={() => handleEdit(student)}
                  data-bs-toggle="modal"
                  data-bs-target="#modalViewStudent"
                >
                  {student.last_name}

                </td>
                <td>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={student.class}
                    id={student.id.toString()}
                    // onChange={handleChangeClass}
                  >
                    {listClass.map((value) => (
                      <option
                        key={value}
                        value={value}
                      >
                        {value}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  {student.parents[0] ? `${student.parents[0]?.first_name} ${student.parents[0]?.last_name}`
                    : (
                      <button
                        type="button"
                        className="btn btn-success mx-1"
                        onClick={() => handleEdit(student)}
                        data-bs-toggle="modal"
                        data-bs-target="#ModalAddStudent"
                      >
                        <i className="bi bi-person-add" />
                      </button>
                    )}

                </td>
                <td>{student.parents[1] ? `${student.parents[1]?.first_name} ${student.parents[1]?.last_name}` : <i className="bi bi-person-add text-success" />}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-warning mx-1"
                    onClick={() => handleEdit(student)}
                    data-bs-toggle="modal"
                    data-bs-target="#ModalAddStudent"
                  >
                    <i className="bi bi-pencil" />
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger mx-1"
                    onClick={() => handleDelete(student.id)}
                  >
                    <i className="bi bi-trash3" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {currentStudent && (
          <div
            className="modal fade "
            id="modalViewStudent"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <ModalViewStudent student={currentStudent} />
          </div>
        )}
        {/* Bootstrap Modal */}
        <div className="modal" tabIndex={-1} id="ModalAddStudent">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{currentStudent ? 'Edition' : 'AJout'}</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                />
              </div>
              {/* <form onSubmit={handleSubmit}>
                <h5>FORM</h5>
              </form> */}
            </div>
          </div>
        </div>

      </div>
    </article>
  );
}

export default ListStudents;
