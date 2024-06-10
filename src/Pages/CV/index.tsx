import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PDFDownloadLink } from '@react-pdf/renderer';
import Selected from './Select';
import ExportPDF from '../../components/Cv/PDF/template';
import ModalAddItem from '../../components/Modal/Ent/form/formJob';
// import useFetchData from '../../hook/useFetchData';
import SectionLayout from '../../layout/SectionLayout';
import FloatCard from '../../components/FloatCard';
import { moussContext } from '../../store/mouss.context';
import { IEmploi } from '../../@types/Home/emploi';

function ViewCVPage() {
  // const [dataSkillList] = useFetchData('/api/home/softskill');
  const { mouss } = useContext(moussContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedSkill, setSelectedSkill] = useState(searchParams.get('fj') || '');
  const [filteredJob, setFilteredJob] = useState<IEmploi[]>([]);
  // const [showModal, setShowModal] = useState(false);

  const AddOnMoussContext = (data: IEmploi) => {
    mouss?.cv.job.push(data);
  };
  // Gestion du select
  const applyFilter = (selectedValue: string) => {
    setSearchParams({ fj: selectedValue });
    setSelectedSkill(selectedValue);
    setFilteredJob(mouss?.cv.job.filter(
      (j) => j.competences.some((c) => c.name === selectedValue),
    ) || []);
  };

  useEffect(() => {
    if (mouss) {
      if (searchParams.get('fj')) {
        setFilteredJob(mouss.cv.job.filter(
          (j) => j.competences.some((c) => c.name === searchParams.get('fj')),
        ));
      } else {
        setFilteredJob(mouss.cv.job);
      }
    }
  }, [mouss, searchParams]);

  if (!mouss) {
    return null;
  }
  const { job, school, ...infoDetailsCV } = mouss.cv;

  return (
    <>
      <SectionLayout
        idName="prez"
        title="Présentation"
        addButton={null}
      >
        <p className="m-3 w-75 mx-auto">{infoDetailsCV.description}</p>
      </SectionLayout>
      <SectionLayout
        idName="job"
        title="Expériences"
        addButton="addItem"
      >
        <div className="d-flex flex-wrap justify-content-evenly">

          {filteredJob && filteredJob
            .sort(
              (a, b) => new Date(b.date.fin).getTime() - new Date(a.date.fin).getTime(),
            )
            .map((j) => (
              <FloatCard
                key={j.id}
                id={j.id}
                title={j.title}
                desc={j.description}
                urlImg={j.ent.urlImg || 'https://via.placeholder.com/150'}
                alt={j.ent.name || 'No Image'}
                date={j.date}
                competences={j.competences || []}
                target="addItem"
                type={j.type}
              />

            ))}
        </div>
      </SectionLayout>

      <SectionLayout
        idName="school"
        title="Formations"
        addButton="addItem"
      >
        <div className="d-flex flex-wrap justify-content-evenly">

          {school && school.sort(
            (a, b) => new Date(b.date.fin).getTime() - new Date(a.date.fin).getTime(),
          )
            .map((j) => (
              <div
                key={j.id}
              >
                <FloatCard
                  id={j.id}
                  title={j.title}
                  desc={j.description}
                  urlImg={j.ent.urlImg || 'https://via.placeholder.com/150'}
                  alt={j.ent.name || 'No Image'}
                  date={j.date}
                  competences={j.competences || []}
                  target="addItem"
                  type={j.type}
                />
              </div>
            ))}
        </div>
      </SectionLayout>
      <section className="py-5 w-100 d-flex flex-row justify-content-center ">

        {!selectedSkill && (
          <Selected
            onHandleSelect={(e) => applyFilter(e.target.value)}
          />
        )}
        {selectedSkill && (
          <PDFDownloadLink
            className="btn btn-primary"
            document={<ExportPDF info={mouss} />}
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
      </section>

      <ModalAddItem onAddElement={AddOnMoussContext} />
    </>
  );
}

export default ViewCVPage;
