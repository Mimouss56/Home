import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ProtectedRoute from '../../../components/ProtectedRoute';
import { IStudent } from '../../../@types/ESA/student';
import ModalAddChildren from './modalAddChild';
import { ErrorSanctionProps } from '../../../@types/error';
import ModalAddParent from './modalViewParent';
import {
  fetchStudents, updateStudent, createStudent, deleteStudent, updateStudentClass,
} from './apiCall';

const initValueStudent = {
  id: 0,
  first_name: '',
  last_name: '',
  classe: '',
  parents: [],
} as IStudent;

function ListStudents() {
  const [studentsList, setStudentsList] = useState<IStudent[]>([]);
  const [currentStudent, setCurrentStudent] = useState(initValueStudent);

  const listClass = ['TPS', 'PS', 'MS', 'GS', 'CP', 'CE1', 'CE2', 'CM1', 'CM2'];

  const fetchAllStudents = async () => {
    try {
      const students = await fetchStudents();

      setStudentsList(students as IStudent[]);
    } catch (error) {
      toast.error('Erreur lors de la récupération des élèves');
    }
  };
  const handleEdit = (student: IStudent) => {
    setCurrentStudent(student);
  };

  const handleFormSubmit = async (data: IStudent) => {
    try {
      if (data.id !== 0) {
        await updateStudent(data);
        toast.success('Élève mis à jour avec succès');
      } else {
        await createStudent(data);
        toast.success('Élève ajouté avec succès');
      }
      await fetchAllStudents();
    } catch (error) {
      toast.error('Erreur lors de la mise à jour de l\'élève');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteStudent(id);
      setStudentsList((prevStudents) => prevStudents.filter((student) => student.id !== id));
      toast.success('Élève supprimé avec succès');
    } catch (error) {
      toast.error("Erreur lors de la suppression de l'élève");
    }
  };

  const handleChangeClass = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = event.target;
    try {
      await updateStudentClass(id, value);
      fetchAllStudents();
    } catch (error) {
      const { response } = error as ErrorSanctionProps;
      toast.error(`🦄 ${response.data.error || response.data.message} ! `);
    }
  };

  const handleParentAdded = () => {
    fetchAllStudents();
  };

  const renderFirstParent = (student: IStudent) => {
    if (student.parents[0]) {
      return `${student.parents[0].first_name} ${student.parents[0].last_name}`;
    }
    return (
      <button
        type="button"
        className="btn btn-success mx-1"
        onClick={() => handleEdit(student)}
        data-bs-toggle="modal"
        data-bs-target="#ModalAddParent"
      >
        <i className="bi bi-person-add" />
      </button>
    );
  };
  const renderSecondParent = (student: IStudent) => {
    if (student.parents[0] && !student.parents[1]) {
      return (
        <button
          type="button"
          className="btn btn-success mx-1"
          onClick={() => handleEdit(student)}
          data-bs-toggle="modal"
          data-bs-target="#ModalAddParent"
        >
          <i className="bi bi-person-add" />
        </button>
      );
    } if (student.parents[1]) {
      return `${student.parents[1].first_name} ${student.parents[1].last_name}`;
    }
    return null;
  };
  useEffect(() => {
    fetchAllStudents();
  }, []);

  return (
    <ProtectedRoute>
      <article>
        <div className="d-flex justify-content-between">
          <h1>Liste des Elèves</h1>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => setCurrentStudent(initValueStudent)}
            data-bs-toggle="modal"
            data-bs-target="#ModalAddStudent"
          >
            Ajout d&apos;un élève
          </button>

        </div>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Classe</th>
                <th>Parent 1</th>
                <th>Parent 2</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {studentsList.map((student) => (
                <tr key={student.id}>
                  <td>{student.last_name}</td>
                  <td>{student.first_name}</td>
                  <td>
                    <select
                      className="form-select"
                      id={student.id.toString()}
                      name="classe"
                      value={student.classe}
                      onChange={handleChangeClass}
                    >
                      {listClass.map((cls) => <option key={cls} value={cls}>{cls}</option>)}
                    </select>
                  </td>
                  <td>
                    {renderFirstParent(student)}
                  </td>
                  <td>
                    {renderSecondParent(student)}
                  </td>
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

        </div>

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
              <ModalAddParent onParentAdded={handleParentAdded} childId={currentStudent.id} />
            </div>
          </div>
        </div>
      </article>
    </ProtectedRoute>
  );
}

export default ListStudents;
