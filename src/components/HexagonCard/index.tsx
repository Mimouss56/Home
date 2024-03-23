import { useState } from 'react';
import ICardPortfolio from '../../@types/portfolio';
import FlipCard from './flipCard';
import useFetchData from '../../hook/useFetchData';
import './style.scss';
import DetailsFloatCard from '../FloatCard/modalViewDetailsFloatCard';

const width = 200;
const marginHexa = 2;

function HexaSection() {
  const [dataPortfolio] = useFetchData('/api/home/portfolio');
  return (
    <div className="d-flex justify-content-center flex-wrap pt-5 bg-dark h-75">
      <h2 className="text-center text-light">Mes différents projets</h2>
      <div className="hex-container">
        {dataPortfolio && dataPortfolio
          .sort((a: ICardPortfolio, b: ICardPortfolio) => (a.id < b.id ? -1 : 1))
          .map((item: ICardPortfolio, index: number) => (
            <div
              key={item.id}
              data-bs-toggle="modal"
              data-bs-target="#viewDetailsFloatCard"
              data-bs-id={item.id}
              data-bs-type="portfolio"
              className="d-inline-block "
              style={{
                animation: `flipOn ${(dataPortfolio.length - index) * 0.2}s ease-in-out`,
                width: `${width}px`,
                height: `${width * 1.1547}px`,
                margin: `${marginHexa}px`,
                marginBottom: `${marginHexa - width * 0.2885}px`,
              }}
            >
              <FlipCard
                img={item.urlImg}
                title={item.nameSite}
                widthHexa={width}
              />
            </div>
          ))}
      </div>
      <DetailsFloatCard />

    </div>
  );
}

export default HexaSection;
