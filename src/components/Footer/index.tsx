function Footer() {
  return (
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top bg-dark">
      <div className="col-md-4 d-flex align-items-center">
        <a href="/" className="mb-3 me-2 mb-md-0 text-white text-decoration-none lh-1">
          <svg className="bi" width="30" height="24"><use xlinkHref="#bootstrap" /></svg>
        </a>
        <span className="mb-3 mb-md-0 text-white">© 2023 author : Mouss</span>
      </div>

      <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
        <li className="ms-3"><a className="text-white" href="/about">About</a></li>
        <li className="ms-3"><a className="text-white" href="/admin">Admin</a></li>
      </ul>
    </footer>
  );
}

export default Footer;
