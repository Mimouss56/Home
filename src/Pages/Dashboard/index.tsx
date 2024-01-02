import {
  useEffect, useMemo, useState,
} from 'react';
import FileUploader from '../../components/fileUploader';
import useImageUpload from '../../hook/utils/useImageUpload';

export default function UserSettingsPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    imageFile, setImageFile, handleUpload, resetImageUpload,
  } = useImageUpload();

  const user = JSON.parse(sessionStorage.getItem('user') || '{}');
  const regex = useMemo(() => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, []);

  const checkPassword = () => {
    if (password !== confirmPassword) {
      setError(true);
      setErrorMessage('Les mots de passe ne correspondent pas');
      // regex pour vérifier la complexité du mot de passe
    } else {
      if (!regex.test(password)) {
        setError(true);
        setErrorMessage('Minimum 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial');
        return;
      }

      setError(false);
      setErrorMessage('');
    }
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    resetImageUpload();
    checkPassword();
    // Logique de soumission du formulaire
    // Vous pouvez envoyer les données mises à jour au backend ici
  };

  useEffect(() => {
    if (password !== confirmPassword) {
      setError(true);
      setErrorMessage('Les mots de passe ne correspondent pas');
      // regex pour vérifier la complexité du mot de passe
    } else {
      if (!regex.test(password)) {
        setError(true);
        setErrorMessage('Minimum 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial');
        return;
      }

      setError(false);
      setErrorMessage('');
    }
    if (user.avatar !== imageFile) {
      setImageFile(imageFile);
    }
  }, [confirmPassword, password, regex, user.avatar, imageFile, setImageFile]);

  console.log('user.avatar', user.avatar);

  return (
    <form>
      <h2 className="mb-4 text-white">Paramètres utilisateur</h2>
      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="card border-white">
            <div className="card-body">
              <h4 className="card-title text-white">Informations personnelles</h4>
              <FileUploader submit={() => handleUpload} img={user.avatar.path || ''} />

              <ul className="list-group list-group-flush">
                <li className="list-group-item border-bottom border-white">
                  <i className="bi bi-person me-2 text-white" />
                  {`Nom: ${user.last_name}`}
                </li>
                <li className="list-group-item border-bottom border-white">
                  <i className="bi bi-person me-2 text-white" />
                  {`Prénom: ${user.first_name}`}
                </li>
                <li className="list-group-item border-bottom border-white">
                  <i className="bi bi-envelope me-2 text-white" />
                  {`Email: ${user.email}`}
                </li>
              </ul>
              <div className="mt-3">
                <span className="badge bg-primary me-2">
                  {user.role.label}
                </span>
                {user.family && (
                  <span className="badge bg-success me-2">
                    Membre de la famille
                  </span>
                )}
                {user.child && (
                  <span className="badge bg-warning me-2">
                    Enfant
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
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
              </div>
              {error && <span className="form-text text-bg-danger badge text-white ">{errorMessage}</span>}
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Enregistrer les modifications
        </button>
      </div>
    </form>
  );
}

/*
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
*/
