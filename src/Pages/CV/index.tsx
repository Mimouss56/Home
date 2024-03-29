import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PDFDownloadLink } from '@react-pdf/renderer';

import { MoussID } from '../../../config.json';
import navTop from '../../../data/navTop.json';

import axiosInstance from '../../utils/axios';

import Selected from './Select';
import ExportPDF from '../../components/Cv/PDF/template';
import ModalAddItem from '../../components/Modal/Ent/formJob';
import { IUser } from '../../@types/Home/user';
import { ICVDetails, IEmploi } from '../../@types/Home/emploi';
import FloatCard from '../../components/FloatCard';
import useFetchData from '../../hook/useFetchData';
import Navbar from '../../layout/Navbar';

function ViewCVPage() {
  const userSession = JSON.parse(sessionStorage.getItem('user') as string) as IUser;
  const [searchParams] = useSearchParams();
  const [listJob, setListJob] = useState<IEmploi[]>([]);
  const [listSchool, setListSchool] = useState<IEmploi[]>([]);
  const [filteredJob, setFilteredJob] = useState<IEmploi[]>([]);
  const [infoCV, setInfoCV] = useState({} as ICVDetails);
  const [selectedSkill, setSelectedSkill] = useState(searchParams.get('fj') || '');

  const [dataSkillList] = useFetchData('/api/home/skill');

  // Chargement des jobs de Mouss
  const fetchDataJobMouss = async () => {
    const response = await axiosInstance.get(`/api/home/user/${MoussID}`);
    const userInfo = response.data.user as IUser;
    const { job, school, ...infoDetailsCV } = userInfo.cv;
    setInfoCV(infoDetailsCV);
    setListJob(userInfo.cv.job);
    setFilteredJob(userInfo.cv.job);
    // setFilteredJob(
    //   searchParams.get('fj') ? applyFilter(searchParams.get('fj') as string) : userInfo.cv.job,
    // );
    setListSchool(userInfo.cv.school);
  };

  // Gestion du select
  const applyFilter = (selectedValue: string) => {
    if (!selectedValue) {
      setFilteredJob(listJob);
      searchParams.delete('fj');
    } else {
      // on filtre les jobs en fonction de la compétence selectionnée
      const filterJob = listJob.filter(
        (job) => job.competences?.some((competence) => competence.name === selectedValue),
      );

      setFilteredJob(filterJob);
      searchParams.set('fj', selectedValue);
    }

    window.history.replaceState(null, '', `?${searchParams.toString()}`);
    setSelectedSkill(selectedValue);
  };

  useEffect(() => {
    fetchDataJobMouss();
  }, []);

  return (
    <>
      <Navbar navContent={navTop} />

      <div className="d-flex flex-column align-items-center ">

        {!selectedSkill
          && (
            <Selected
              skills={dataSkillList}
              onHandleSelect={(e) => applyFilter(e.target.value)}
            />
          )}
        {selectedSkill && (
          <PDFDownloadLink
            className="btn btn-primary"
            document={<ExportPDF listJob={filteredJob} listSchool={listSchool} title={infoCV} />}
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
          <h2>Présentation</h2>
        </div>
        <p className="m-3 w-75">{infoCV.description}</p>

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
                  competences={job.competences || []}
                  target="addItem"
                  type="job"
                />
              </div>
            ))}
        </div>

        <div className="d-flex justify-content-between mt-5 text-dark w-100 mx-auto border-1 border-top border-bottom p-2">
          <h2 className="">Formations</h2>
          {userSession?.role.label === 'admin' && (
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#addItem"
              data-bs-id="0"
            >
              Ajouter
            </button>
          )}
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
        <ModalAddItem onAddElement={fetchDataJobMouss} listSkill={dataSkillList} />

      </div>
    </>
  );
}

export default ViewCVPage;
