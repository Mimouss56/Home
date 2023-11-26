import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import ReactPDF, { PDFViewer } from '@react-pdf/renderer';

import { MoussID } from '../../../config.json';
import axiosInstance from '../../utils/axios';

import Selected from './Select';
import { IEmploi } from '../../@types/Home/emploi';
import ExportPDF from '../../components/Cv/PDF/template';

function ViewCVPage() {
  const [searchParams] = useSearchParams();

  const [listJob, setListJob] = useState([]);
  const [listSchool, setListSchool] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(searchParams.get('fj') || '');

  const exportPDF = () => {
    // <PDFViewer>
    //   <ExportPDF listJob={listJob} listSchool={listSchool} />
    // </PDFViewer>;
    ReactPDF.render(<ExportPDF listJob={listJob} listSchool={listSchool} />, `CV-${Date.now()}`);
  };
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSkill(e.target.value);
    // on filtre les jobs avec les competences qui sont en fonction de la valeur du select
    const filteredJob = listJob.filter(
      (job: IEmploi) => job.competences.includes(e.target.value),
    );

    setListJob(filteredJob);
    searchParams.set('fj', e.target.value);
    window.history.replaceState(null, '', `?${searchParams.toString()}`);
  };
  // Chargement des Skills pour le select
  const fetchDataSkills = async () => {
    const response = await axiosInstance.get('/home/skill');
    setSkills(response.data);
  };

  const fetchDataJobMouss = async (skilled: string | null = null) => {
    const response = await axiosInstance.get(`/home/user/${MoussID}`);
    if (!skilled) setListJob(response.data.user.job);
    else {
      response.data.user.job.filter(
        (job: IEmploi) => job.competences.includes(skilled),
      );
    }
    setListSchool(response.data.user.school);
  };

  useEffect(() => {
    fetchDataJobMouss(selectedSkill);
    fetchDataSkills();
  }, [selectedSkill]);

  return (
    <div className="d-flex flex-column ">
      {
        !searchParams.get('fj') && (
          <Selected skills={skills} onHandleSelect={(handleChange)} />
        )
      }
      <PDFViewer style={{ height: '100vh' }}>
        <ExportPDF listJob={listJob} listSchool={listSchool} />
      </PDFViewer>
    </div>
  );
}

export default ViewCVPage;
