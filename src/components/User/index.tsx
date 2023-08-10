/* eslint-disable react/no-unescaped-entities */
import { Routes, Route } from 'react-router-dom';
import { Modal } from 'antd';
import Setting from './Setting';
import Job from './Job';
import { User as IUser } from '../../@types/user';
import NotFound from '../notFound';
import ModalAddItem from './ModalAdd';

function User() {
  const userInfos = JSON.parse(sessionStorage.getItem('user') as string) as IUser;
  const { school, job } = userInfos;

  return (
    <div>
      <h1>User</h1>

      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addItem">
        Ajout d'un item
      </button>
      <ModalAddItem />

      <Routes>
        <Route path="setting" element={<Setting />} />
        <Route path="jobs" element={<Job jobs={job} />} />
        <Route path="school" element={<Job jobs={school} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default User;
