import { useEffect, useState } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import ExportPDF from '../../components/Cv/PDF/template';
import { MoussID } from '../../../config.json';
import axiosInstance from '../../utils/axios';
import { ICVDetails, IEmploi } from '../../@types/Home/emploi';
import { IUser } from '../../@types/Home/user';
import Textarea from '../../components/Form/textarea';
import SectionLayout from '../../layout/SectionLayout';

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
    <SectionLayout
      idName="render-cv"
      title="Création de CV"
      addButton={null}
    >
      <div className="input-group mb-3 w-50 mx-auto my-5">
        <span className="input-group-text" id="prefixId">Titre</span>
        <input
          type="text"
          name="title"
          id="title"
          className="form-control"
          placeholder="Titre du CV"
          onChange={(e) => setTitle({ ...title, title: e.target.value })}
        />
      </div>
      <div className="w-75 mx-auto">
        <Textarea
          title="Description"
          text={title.description}
          name="description"
          onChange={(e) => setTitle({ ...title, description: e.target.value })}
          icon=""
          leng={500}
        />
      </div>

      <PDFViewer style={{
        width: '100%',
        height: '100vh',

      }}
      >
        <ExportPDF listJob={listJob} listSchool={listSchool} title={title} />
      </PDFViewer>

    </SectionLayout>
  );
}

export default RenderCv;
