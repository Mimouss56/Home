import { ICardNews } from '../../../@types/Home/card';
import Card from '../../../components/Card';
import useScrollSection from '../../../hook/useScrollSection';
import SectionLayout from '../../../layout/SectionLayout';

const idName = 'news';

function NewsSection({ listNews }: { listNews: ICardNews[] }) {
  useScrollSection(idName);
  return (
    <SectionLayout idName={idName} title="Actualités" addButton={null}>
      <div className="d-flex flex-wrap w-75 mx-auto">
        {listNews && listNews.map((item: ICardNews) => (
          <Card key={item.id}>
            {/* eslint-disable-next-line react/no-danger */}
            <div dangerouslySetInnerHTML={{ __html: item.content }} />
          </Card>
        ))}
      </div>
    </SectionLayout>

  );
}

export default NewsSection;
