import './style.css';
import './error';

export default function NotFound() {
  return (
    <div className="error-container">
      <h1 className="error-code" id="error-code">
        <div className="digit-container" id="digit1-container"><span id="digit1">4</span></div>
        <div className="digit-container" id="digit2-container"><span id="digit2">0</span></div>
        <div className="digit-container" id="digit3-container"><span id="digit3">4</span></div>
      </h1>
      <p className="error-message">Not Found</p>
      <p className="error-description">Hmmm Tu viens de chercher les tréfonds du serveur, remonte à la surface</p>
      <a className="home-link" href="https://www.mimouss.fr">Back to Home</a>
    </div>
  );
}
