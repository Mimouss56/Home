import './style.scss';

function Loading() {
  return (
    <div className="loading position-fixed top-0 h-100 w-100 bg-black z-3 start-0 ">
      <div className="loading-text">
        <span className="loading-text-words">L</span>
        <span className="loading-text-words">O</span>
        <span className="loading-text-words">A</span>
        <span className="loading-text-words">D</span>
        <span className="loading-text-words">I</span>
        <span className="loading-text-words">N</span>
        <span className="loading-text-words">G</span>
      </div>
    </div>
  );
}

export default Loading;
