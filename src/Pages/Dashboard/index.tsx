import { useRef, useState } from 'react';

export default function UserSettingsPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const user = JSON.parse(sessionStorage.getItem('user') || '{}');
  const fileInputRef = useRef(null);

  const handleImageChange = (e: Event) => {
    const target = e.target as HTMLImageElement;
    console.log(target);
  };

  const handleFileChange = (e : any) => {
    // Gérer le changement de fichier ici
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Faire quelque chose avec le fichier sélectionné
      // (par exemple, le télécharger, l'afficher, etc.)
      console.log(`Nouveau fichier sélectionné: ${selectedFile.name}`);
    }
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    // Logique de soumission du formulaire
    // Vous pouvez envoyer les données mises à jour au backend ici
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-primary">Paramètres utilisateur</h2>
      <div className="row">
        <div className="col-md-6">
          <div className="card border-primary">
            <div className="card-body">
              <h4 className="card-title text-primary">Informations personnelles</h4>
              <figure
                className="figure position-relative d-flex justify-content-center align-items-center"
              >
                <img
                  src="https://pluspng.com/img-png/github-octocat-logo-vector-png--896.jpg"
                  alt="user"
                  className="figure-img img-fluid rounded-circle w-25"
                />
                <figcaption className="figure-caption position-absolute bottom-0 bg-opacity-25 bg-dark">
                  Change
                </figcaption>
              </figure>
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <ul className="list-group list-group-flush">
                <li className="list-group-item border-bottom border-primary">
                  <i className="bi bi-person me-2 text-primary" />
                  {`Nom: ${user.last_name}`}
                </li>
                <li className="list-group-item border-bottom border-primary">
                  <i className="bi bi-person me-2 text-primary" />
                  {`Prénom: ${user.first_name}`}
                </li>
                <li className="list-group-item border-bottom border-primary">
                  <i className="bi bi-envelope me-2 text-primary" />
                  {`Email: ${user.email}`}
                </li>
              </ul>
              <div className="mt-3">
                <span className="badge bg-primary me-2">
                  <i className="bi bi-person" />
                  {user.role.label}
                </span>
                {user.family && (
                  <span className="badge bg-success me-2">
                    <i className="bi bi-person" />
                    Membre de la famille
                  </span>
                )}
                {user.child && (
                  <span className="badge bg-warning me-2">
                    <i className="bi bi-person" />
                    {' '}
                    Enfant
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card border-primary">
            <div className="card-body">
              <h4 className="card-title mt-4 text-primary">Modifier le mot de passe</h4>
              <div className={`input-group mb-3 ${error ? 'has-error' : ''}`}>
                <i className="input-group-text bi bi-key" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className={`input-group-text bi bi-eye${showPassword ? '-slash' : ''}`}
                  onClick={() => setShowPassword(!showPassword)}
                />
                {error && <span className="help-block">{errorMessage}</span>}
              </div>
              <div className={`input-group mb-3 ${error ? 'has-error' : ''}`}>
                <i className="input-group-text bi bi-key" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="form-control"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  className={`input-group-text bi bi-eye${showConfirmPassword ? '-slash' : ''}`}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
                {error && <span className="help-block">{errorMessage}</span>}
              </div>
              {' '}
              <button type="submit" className="btn btn-primary">
                Enregistrer les modifications
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
