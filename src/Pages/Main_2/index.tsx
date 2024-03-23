import { PDFViewer } from '@react-pdf/renderer';
import { IUser } from '../../@types/Home/user';
import Navbar from '../../layout/Navbar';
import navTop from '../../../data/navTop.json';
import Prez from './prez';
import HexaSection from '../../components/HexagonCard';
import ExportPDF from '../../components/Cv/PDF/template';

function LandingPage({ info }: { info: IUser }) {
  const { job, school, ...infoDetailsCV } = info.cv;

  return (
    <>
      <Prez Mouss={info} />
      <Navbar navContent={navTop} />
      <HexaSection />
      <div className="d-flex flex-column ">
        <PDFViewer style={{
          width: '100%',
          height: '100vh',
        }}
        >
          <ExportPDF
            listJob={info.cv.job.filter(
              (j) => j.competences?.some((competence) => competence.name === 'Maintenance'),
            )}
            listSchool={info.cv.school}
            title={infoDetailsCV}
          />
        </PDFViewer>
      </div>

    </>
  );
}

export default LandingPage;
