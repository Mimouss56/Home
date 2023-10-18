import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../../utils/axios';
import ProtectedRoute from '../../ProtectedRoute';
import { IStudent, IcreateStudent } from '../../../@types/ESA/student';
import ModalAddChildren from './modalAddChild';
import { ErrorSanctionProps } from '../../../@types/error';
import ModalAddParent from './modalViewParent';

function ListStudents() {
  const [studentsList, setStudentsList] = useState<IStudent[]>([]);
  const [currentStudent, setCurrentStudent] = useState(null as IStudent | null);

  const listClass = ['TPS', 'PS', 'MS', 'GS', 'CP', 'CE1', 'CE2', 'CM1', 'CM2'];

  const fetchStudents = async () => {
    try {
      const response = await axiosInstance.get('/esa/child');
      setStudentsList(response.data);
    } catch (error) {
      toast.error('Erreur lors de la récupération des élèves');
    }
  };

  const handleParentAdded = () => {
    fetchStudents();
  };
  const handleFormSubmit = async (data: IcreateStudent) => {
    try {
      if (data.id !== 0) {
        // Update student
        await axiosInstance.put(`/esa/child/${data.id}`, data);
        toast.success('Élève mis à jour avec succès');
      } else {
        const { id, ...rest } = data;
        // Create student
        await axiosInstance.post('/esa/child', rest);
        toast.success('Élève ajouté avec succès');
      }
      fetchStudents();
    } catch (error) {
      toast.error('Erreur lors de la mise à jour de l\'élève');
    }
  };

  const handleEdit = (student: IStudent) => {
    setCurrentStudent(student);
  };

  const handleDelete = async (id: number) => {
    try {
      await axiosInstance.delete(`/esa/child/${id}`);
      setStudentsList(studentsList.filter((student) => student.id !== id));
      toast.success('Élève supprimé avec succès');
    } catch (error) {
      toast.error("Erreur lors de la suppression de l'élève");
    }
  };

  const handleChangeClass = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    try {
      await axiosInstance.put(`/esa/child/${event.target.id}`, {
        classe: event.target.value,
      });
      fetchStudents();
    } catch (error) {
      const { response } = error as ErrorSanctionProps;
      toast.error(`🦄 ${response.data.error || response.data.message} ! `);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <ProtectedRoute>
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
        <table className="table">
          <thead>
            <tr>
              <th>Prénom</th>
              <th>Nom</th>
              <th>Classe</th>
              <th>Parent 1</th>
              <th>Parent 2</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {studentsList.map((student) => (
              <tr key={student.id}>
                <td>{student.first_name}</td>
                <td>{student.last_name}</td>
                <td>
                  <select
                    className="form-select"
                    id="classe"
                    name="classe"
                    value={student.class}
                    onChange={handleChangeClass}
                  >
                    {listClass.map((cls) => <option key={cls} value={cls}>{cls}</option>)}
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
                        data-bs-target="#ModalAddParent"
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
                    data-bs-target="#ModalAddSanction"
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

        {/* Bootstrap Modal */}
        {/* Modale pour l'ajout/édition */}
        <div className="modal" tabIndex={-1} id="ModalAddStudent">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{currentStudent ? 'Editition' : 'Ajout'}</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                />
              </div>
              <ModalAddChildren child={currentStudent} onSubmit={handleFormSubmit} />
            </div>
          </div>
        </div>

        <div className="modal" tabIndex={-1} id="ModalAddParent">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Ajouter un parent</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" />
              </div>
              <ModalAddParent onParentAdded={handleParentAdded} />
            </div>
          </div>
        </div>
      </article>
    </ProtectedRoute>
  );
}

export default ListStudents;
