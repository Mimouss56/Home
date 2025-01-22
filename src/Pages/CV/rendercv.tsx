import { useEffect, useState } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import ExportPDF from '../../components/Cv/PDF/template';
import { ICVDetails } from '../../@types/Home/emploi';
import Textarea from '../../components/Form/textarea';
import SectionLayout from '../../layout/SectionLayout';
import useMoussStore from '../../store/mouss.store';

function RenderCv() {
  const [title, setTitle] = useState<ICVDetails>({} as ICVDetails);

  const { mouss } = useMoussStore((state) => state);
  useEffect(() => {
    if (mouss) {
      const { job, school, ...infoDetailsCV } = mouss.cv;

      setTitle(infoDetailsCV);
    }
  }, [mouss]);

  if (!mouss) return null;

  return (
    <SectionLayout
      idName="render-cv"
      title="Rendu de CV"
      addButton={null}
    >
      <div className="input-group w-50 mx-auto my-5 ">
        <span className="input-group-text" id="prefixId">Titre</span>
        <input
          type="text"
          name="title"
          id="title"
          className="form-control"
          placeholder="Titre du CV"
          onChange={(e) => setTitle({ ...title, title: e.target.value })}
          value={title.title}
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
        height: '50vh',

      }}
      >
        <ExportPDF
          info={mouss}
        />
      </PDFViewer>

    </SectionLayout>
  );
}

export default RenderCv;
