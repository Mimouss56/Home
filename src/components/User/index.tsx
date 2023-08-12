/* eslint-disable react/no-unescaped-entities */
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Setting from './Setting';
import Job from './Job';
import NotFound from '../notFound';
import ModalAddItem from './ModalAdd';
import { Job as IJob } from '../../@types/emploi';
import axiosInstance from '../../utils/axios';

function User() {
  const [job, setJob] = useState<IJob[]>([]);
  const [school, setSchool] = useState<IJob[]>([]);
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/job/@me');

      setJob(response.data);
      const response2 = await axiosInstance.get('/school/@me');
      setSchool(response2.data);
    } catch (error: any) {
      sessionStorage.setItem('notifToast', error.response.data.message);
      if (error.response.status === 401) {
        sessionStorage.clear();
        // redirect to home
        window.location.href = '/user';
      }
    }
  };

  const handleAddElement = (data: IJob, type: string) => {
    if (type === 'job') {
      setJob((oldJob) => [...oldJob, data]);
    } else {
      setSchool((oldSchool) => [...oldSchool, data]);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>User</h1>

      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addItem">
        Ajout d'un item
      </button>
      <ModalAddItem onAddElement={handleAddElement} />

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
