/* eslint-disable jsx-a11y/alt-text */
import useFetchData from '../../hook/useFetchData';
import ICardPortfolio from '../../@types/portfolio';
import FlipCard from '../../components/HexagonCard/flipCard';

function Test() {
  const [dataPortfolio] = useFetchData('/api/home/portfolio');
  return (
    <ul className="honeycomb">
      <li className="honeycomb-cell">
        <img className="honeycomb-cell__image" src="https://source.unsplash.com/random/1" />
        <div className="honeycomb-cell__title">Diseño exclusivo</div>
      </li>
      {dataPortfolio && dataPortfolio
        .sort((a: ICardPortfolio, b: ICardPortfolio) => (a.id < b.id ? -1 : 1))
        .map((item: ICardPortfolio) => (
          <FlipCard
            key={item.id}
            img={item.urlImg}
            title={item.nameSite}
            widthHexa={200}
          />
        ))}
    </ul>
  );
}

export default Test;
