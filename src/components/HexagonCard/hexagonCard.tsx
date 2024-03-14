function HexagonCard({ children }: { children: JSX.Element }) {
  return (
    <div
      className="overflow-hidden h-100 invisible "
      style={{ transform: 'rotate(120deg)' }}
    >
      <div
        className="overflow-hidden h-100"
        style={{ transform: 'rotate(-60deg)' }}
      >
        <div
          className="visible h-100"
          style={{ transform: 'rotate(-60deg)' }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default HexagonCard;
