export default function ConnexionBtn() {
  return (
    <button
      type="button"
      className="btn btn-dark text-light fw-bold "
      data-bs-toggle="modal"
      data-bs-target="#modalLogin"
      data-bs-backdrop="static"
    >
      Connexion
    </button>
  );
}
