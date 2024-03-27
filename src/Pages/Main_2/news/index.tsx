import { ICardNews } from '../../../@types/Home/card';
import Card from '../../../components/Card';

function NewsSection({ listNews }: { listNews: ICardNews[] }) {
  return (
    <section className="news bg-dark">
      <div className="d-flex justify-content-between mb-5 w-100 mx-auto border-1 border-top border-bottom p-2 bg-secondary">
        <h2>Nouveautés de l&apos;application</h2>
      </div>
      <div className="d-flex flex-wrap">
        {listNews && listNews.map((item: ICardNews) => (
          <Card key={item.id}>
            {/* eslint-disable-next-line react/no-danger */}
            <div dangerouslySetInnerHTML={{ __html: item.content }} />
          </Card>
        ))}
      </div>
    </section>
  );
}

export default NewsSection;
