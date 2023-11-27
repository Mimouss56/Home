import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PDFDownloadLink } from '@react-pdf/renderer';

import { MoussID } from '../../../config.json';
import axiosInstance from '../../utils/axios';

import Selected from './Select';
import { IEmploi } from '../../@types/Home/emploi';
import ExportPDF from '../../components/Cv/PDF/template';
import Job from '../../components/Job';

function ViewCVPage() {
  const [searchParams] = useSearchParams();
  const [listJob, setListJob] = useState([]);
  const [listSchool, setListSchool] = useState([]);
  const [filteredJob, setFilteredJob] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(searchParams.get('fj') || '');

  // Chargement des Skills pour le select
  const fetchDataSkills = async () => {
    const response = await axiosInstance.get('/home/skill');
    setSkills(response.data);
  };

  // Chargement des jobs de Mouss
  const fetchDataJobMouss = async () => {
    const response = await axiosInstance.get(`/home/user/${MoussID}`);
    setListJob(response.data.user.job);
    setFilteredJob(response.data.user.job);
    setListSchool(response.data.user.school);
  };

  // Gestion du select
  const applyFilter = (selectedValue: string) => {
    if (!selectedValue) {
      setFilteredJob(listJob);
      searchParams.delete('fj');
    } else {
      const filterJob = listJob.filter((job: IEmploi) => job.competences.includes(selectedValue));
      setFilteredJob(filterJob);
      searchParams.set('fj', selectedValue);
    }

    window.history.replaceState(null, '', `?${searchParams.toString()}`);
    setSelectedSkill(selectedValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    applyFilter(e.target.value);
  };

  useEffect(() => {
    fetchDataJobMouss();
    fetchDataSkills();
  }, []);

  return (
    <div className="d-flex flex-column ">
      {!selectedSkill && <Selected skills={skills} onHandleSelect={handleChange} />}
      {selectedSkill && (
        <PDFDownloadLink
          className="btn btn-primary"
          document={<ExportPDF listJob={filteredJob} listSchool={listSchool} />}
          fileName="Cv-LE_PRIOL_Matthieu.pdf"
        >
          {({ loading }) => (loading ? (
            <>
              <span className="spinner-border spinner-border-sm" aria-hidden="true" />
              <span role="status">Loading...</span>
            </>
          ) : (
            'Télécharger le CV'
          ))}
        </PDFDownloadLink>
      )}
      <Job jobs={filteredJob} />

    </div>
  );
}

export default ViewCVPage;
