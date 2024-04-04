import { INews } from '../../../@types/Home/news';
import Card from '../../../components/Card';
import ModalAddNews from '../../../components/Modal/News/formNews';
import useFetchData from '../../../hook/useFetchData';
import useScrollSection from '../../../hook/useScrollSection';
import SectionLayout from '../../../layout/SectionLayout';

const idName = 'news';

function NewsSection() {
  const [dataNews] = useFetchData('/api/home/news');
  const listNews = dataNews as INews[];

  useScrollSection(idName);
  return (
    <>
      <SectionLayout idName={idName} title="Actualités" addButton="addModalNews">
        <div className="d-flex flex-wrap w-75 mx-auto">
          {listNews && listNews
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
            .map((item) => (
              <Card key={item.id}>
                {/* eslint-disable-next-line react/no-danger */}
                <div dangerouslySetInnerHTML={{ __html: item.content }} />
              </Card>
            ))}
        </div>
      </SectionLayout>
      <ModalAddNews onAddElement={() => dataNews} />
    </>

  );
}

export default NewsSection;
