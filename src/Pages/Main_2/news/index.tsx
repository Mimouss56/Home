import { useContext } from 'react';
import { INews } from '../../../@types/Home/news';
import { CardNews } from '../../../components/.unused/Card';
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
      title="Changelog"
      addButton="addModalNews"
    >
      <div
        className="w-75 mx-auto d-flex justify-content-center flex-wrap max-vh-100 my-5  " // d-none d-md-block
        id={`${idName}-content`}
      >
        {listNews && listNews
          .sort((a, b) => {
            if (a.created_at && b.created_at) {
              return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            }
            return 0;
          })
          .map((item) => (
            (!item.draft || user?.username === 'Mouss') && (<CardNews key={item.id} info={item} />)
          ))}
      </div>
      {user?.username === 'Mouss' && (
        <ModalAddNews onAddElement={dataNews} />
      )}
    </SectionLayout>

  );
}

export default NewsSection;
