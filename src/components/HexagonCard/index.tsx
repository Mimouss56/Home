import './hexagon.scss';

function HexagonCard({ children }: { children: any }) {
  return (
    <div className="hexagon">
      <div className="hexagon-in1">
        <div className="hexagon-in2">
          {children}
        </div>
      </div>
    </div>
  );
}

export default HexagonCard;
