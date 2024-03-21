import { useEffect, useState } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import ExportPDF from '../../components/Cv/PDF/template';
import { MoussID } from '../../../config.json';
import axiosInstance from '../../utils/axios';
import { ICVDetails, IEmploi } from '../../@types/Home/emploi';
import { IUser } from '../../@types/Home/user';

function RenderCv() {
  const [listJob, setListJob] = useState<IEmploi[]>([]);
  const [listSchool, setListSchool] = useState<IEmploi[]>([]);
  const [title, setTitle] = useState<ICVDetails>({} as ICVDetails);

  // Chargement des jobs de Mouss
  const fetchDataJobMouss = async () => {
    const response = await axiosInstance.get(`/api/home/user/${MoussID}`);
    const userInfo = response.data.user as IUser;
    const { job, school, ...infoDetailsCV } = userInfo.cv;
    const filterJob = userInfo.cv.job.filter(
      (j) => j.competences?.some((competence) => competence.name === 'Maintenance'),
    );
    setListJob(filterJob);
    setListSchool(userInfo.cv.school);
    setTitle(infoDetailsCV);
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
        <ExportPDF listJob={listJob} listSchool={listSchool} title={title} />
      </PDFViewer>
    </div>
  );
}

export default RenderCv;
