function HexagonCard({ children }: { children: JSX.Element }) {
  return (
    <div
      className="overflow-hidden w-100 h-100 pe-auto invisible"
      style={{ transform: 'rotate(120deg)' }}
    >
      <div
        className="overflow-hidden w-100 h-100"
        style={{ transform: 'rotate(-60deg)' }}
      >
        <div
          className="bg-white visible w-100 h-100 "
          style={{ transform: 'rotate(-60deg)' }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default HexagonCard;
