import { useContext } from 'react';
import { INews } from '../../../@types/Home/news';
import Card from '../../../components/Card';
import ModalAddNews from '../../../components/Modal/News/formNews';
import useFetchData from '../../../hook/useFetchData';
import SectionLayout from '../../../layout/SectionLayout';
import { userContext } from '../../../store/user.context';

const idName = 'news';

function NewsSection() {
  const [dataNews] = useFetchData('/api/home/news');
  const listNews = dataNews as INews[];
  const { user } = useContext(userContext);

  return (
    <SectionLayout
      idName={idName}
      title="Actualités"
      addButton="addModalNews"
    >
      <div
        className="w-75 m-auto d-flex justify-content-center flex-wrap max-vh-100 my-5  " // d-none d-md-block
        id={`${idName}-content`}
      >
        {listNews && listNews
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .map((item) => (
            <Card key={item.id}>
              {/* eslint-disable-next-line react/no-danger */}
              <div dangerouslySetInnerHTML={{ __html: item.content }} />
            </Card>
          ))}
      </div>
      {user?.username === 'Mouss' && (
        <ModalAddNews onAddElement={() => dataNews} />
      )}
    </SectionLayout>

  );
}

export default NewsSection;
