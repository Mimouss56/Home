import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PDFDownloadLink } from '@react-pdf/renderer';

import { MoussID } from '../../../config.json';
import axiosInstance from '../../utils/axios';

import Selected from './Select';
import ExportPDF from '../../components/Cv/PDF/template';
import ModalAddItem from '../../components/Modal/Ent/formJob';
import { IUser } from '../../@types/Home/user';
import { IEmploi } from '../../@types/Home/emploi';
import { ISkill } from '../../@types/Home/skill';
import FloatCard from '../../components/FloatCard';

function ViewCVPage() {
  const userSession = JSON.parse(sessionStorage.getItem('user') as string) as IUser;
  const [searchParams] = useSearchParams();
  const [listJob, setListJob] = useState<IEmploi[]>([]);
  const [listSchool, setListSchool] = useState<IEmploi[]>([]);
  const [filteredJob, setFilteredJob] = useState<IEmploi[]>([]);
  const [skills, setSkills] = useState<ISkill[]>([]);
  const [selectedSkill, setSelectedSkill] = useState(searchParams.get('fj') || '');

  // Chargement des Skills pour le select
  const fetchDataSkills = async () => {
    const response = await axiosInstance.get('/api/home/skill');
    setSkills(response.data);
  };

  // Chargement des jobs de Mouss
  const fetchDataJobMouss = async () => {
    const response = await axiosInstance.get(`/api/home/user/${MoussID}`);
    const userInfo = response.data.user as IUser;
    setListJob(userInfo.cv.job);
    setFilteredJob(userInfo.cv.job);
    setListSchool(userInfo.cv.school);
  };

  // Gestion du select
  const applyFilter = (selectedValue: string) => {
    if (!selectedValue) {
      setFilteredJob(listJob);
      searchParams.delete('fj');
    } else {
      const filterJob = listJob.filter((job) => job.competences?.includes(selectedValue));
      setFilteredJob(filterJob);
      searchParams.set('fj', selectedValue);
    }

    window.history.replaceState(null, '', `?${searchParams.toString()}`);
    setSelectedSkill(selectedValue);
  };

  useEffect(() => {
    fetchDataJobMouss();
    fetchDataSkills();
  }, []);

  return (
    <div className="d-flex flex-column align-items-center ">

      {!selectedSkill
        && <Selected skills={skills} onHandleSelect={(e) => applyFilter(e.target.value)} />}
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
      <div className="d-flex justify-content-between mt-5 text-dark w-100 mx-auto border-1 border-top border-bottom p-2">
        <h2 className="">Expériences</h2>
        {userSession?.role.label === 'admin' && (
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addItem"
          >
            Ajouter
          </button>
        )}

      </div>
      <div className="d-flex flex-wrap justify-content-evenly">
        <ModalAddItem onAddElement={fetchDataJobMouss} />

        {filteredJob && filteredJob.sort(
          (a, b) => new Date(b.date.fin).getTime() - new Date(a.date.fin).getTime(),
        )
          .map((job) => (
            <div
              key={job.id}
            >
              <FloatCard
                id={job.id}
                title={job.title}
                desc={job.description}
                urlImg={job.ent.urlImg}
                alt={job.ent.name}
                date={job.date}
                competences={job.competences}
                target="addItem"
                type="job"
              />
            </div>
          ))}
      </div>

      {/* <Job jobs={filteredJob} typeData="job" /> */}
      <div className="d-flex justify-content-between mt-5 text-dark w-100 mx-auto border-1 border-top border-bottom p-2">
        <h2 className="">Formations</h2>
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#addItem"
          data-bs-id="0"
        >
          Ajouter
        </button>
      </div>
      <div className="d-flex flex-wrap justify-content-evenly">

        {listSchool && listSchool.sort(
          (a, b) => new Date(b.date.fin).getTime() - new Date(a.date.fin).getTime(),
        )
          .map((job) => (
            <FloatCard
              key={job.id}
              id={job.id}
              title={job.title}
              desc={job.description}
              urlImg={job.ent.urlImg}
              alt={job.ent.name}
              date={job.date}
              competences={job.competences || []}
              target="addItem"
              type="school"
            />
          ))}
      </div>

      {/* <Job jobs={listSchool} typeData="school" /> */}
    </div>
  );
}

export default ViewCVPage;
