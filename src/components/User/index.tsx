import { Routes, Route, Outlet } from 'react-router-dom';
import { useState } from 'react';
import Setting from './Setting';
import Job from './Job';
import NotFound from '../notFound';
import ModalAddItem from './ModalAdd';
import { Job as IJob } from '../../@types/emploi';

function User() {
  const userStorage = sessionStorage.getItem('user');
  const userInfos = userStorage ? JSON.parse(userStorage) : null;

  const [job, setJob] = useState<IJob[]>(userInfos?.job || []);
  const [school, setSchool] = useState<IJob[]>(userInfos?.school || []);

  const handleAddElement = (data: IJob, type: string) => {
    if (type === 'job') {
      setJob((oldJob: IJob[]) => [...oldJob, data]);
    } else {
      setSchool((oldSchool: IJob[]) => [...oldSchool, data]);
    }
  };

  return (
    <div>
      <ModalAddItem onAddElement={handleAddElement} />

      <Routes>
        <Route path="setting" element={<Setting />} />
        <Route
          path="jobs"
          element={(
            <>
              <h2>Emploi</h2>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#addItem"
                data-bs-type="job"
              >
                Ajout d&apos;un item
              </button>
              <Job jobs={job} />
            </>
          )}
        />
        <Route
          path="school"
          element={(
            <>
              <h2>Formation</h2>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#addItem"
                data-bs-type="school"
              >
                Ajout d&apos;un item
              </button>
              <Job jobs={school} />
            </>
          )}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Outlet />
    </div>
  );
}

export default User;
