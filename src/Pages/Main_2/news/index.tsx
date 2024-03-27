import { ICardNews } from '../../../@types/Home/card';
import Card from '../../../components/Card';

function NewsSection({ listNews }: { listNews: ICardNews[] }) {
  return (
    <section className="news">
      <div className="news__container">
        <h2>Nouveautés de l&apos;application</h2>
        <div className="d-flex flex-wrap">
          {listNews && listNews.map((item: ICardNews) => (
            <Card key={item.id}>
              {/* eslint-disable-next-line react/no-danger */}
              <div dangerouslySetInnerHTML={{ __html: item.content }} />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NewsSection;
