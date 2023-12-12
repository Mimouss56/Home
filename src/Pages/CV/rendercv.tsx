import { useEffect, useState } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import ExportPDF from '../../components/Cv/PDF/template';
import { MoussID } from '../../../config.json';
import axiosInstance from '../../utils/axios';
import { IEmploi } from '../../@types/Home/emploi';

function RenderCv() {
  const [listJob, setListJob] = useState([]);
  const [listSchool, setListSchool] = useState([]);

  // Chargement des jobs de Mouss
  const fetchDataJobMouss = async () => {
    const response = await axiosInstance.get(`/home/user/${MoussID}`);
    const filterJob = response.data.user.job.filter(
      (job: IEmploi) => job.competences.includes('Maintenance'),
    );
    setListJob(filterJob);
    setListSchool(response.data.user.school);
  };

  useEffect(() => {
    fetchDataJobMouss();
  }, []);

  return (
    <div className="d-flex flex-column ">
      <PDFViewer style={{
        width: '100%',
        height: '100vh',

      }}
      >
        <ExportPDF listJob={listJob} listSchool={listSchool} />
      </PDFViewer>
    </div>
  );
}

export default RenderCv;
