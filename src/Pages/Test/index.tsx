import { INews } from '../../@types/Home/news';
import useFetchData from '../../hook/useFetchData';
import SectionLayout from '../../layout/SectionLayout';
import { CardNews } from '../../components/Card';

const idName = 'news';

function Test() {
  const [dataNews] = useFetchData('/api/home/news');
  const listNews = dataNews as INews[];

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
            <CardNews key={item.id} info={item} />
          ))}
      </div>

    </SectionLayout>

  );
}

export default Test;
