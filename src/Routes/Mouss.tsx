import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Section from '../components/Mouss/section';
import Kanban from '../Pages/Kanban';
import axiosInstance from '../utils/axios';

function Mouss() {
  const [jobs, setJobs] = useState([]);
  const [school, setSchool] = useState([]);

  const fetchJobs = async () => {
    const response = await axiosInstance.get('/home/job/@me');
    const { data } = response;
    setJobs(data);
  };

  const fetchSchool = async () => {
    const response = await axiosInstance.get('/home/school/@me');
    const { data } = response;
    setSchool(data);
  };

  useEffect(() => {
    fetchJobs();
    fetchSchool();
  }, []);

  return (
    <Routes>
      <Route path="jobs" element={<Section title="Emploi" initialItems={jobs || []} type="job" />} />
      <Route path="school" element={<Section title="Formation" initialItems={school || []} type="school" />} />
      <Route path="kanban" element={<Kanban />} />
    </Routes>
  );
}

export default Mouss;
