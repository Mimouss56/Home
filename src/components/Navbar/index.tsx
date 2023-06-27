function Navbar() {
  return (
    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start bg-dark p-2">
      <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
        Mimouss
      </a>

      <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
        <li><a href="/" className="nav-link px-2 text-secondary">Home</a></li>
        <li><a href="/feature" className="nav-link px-2 text-white">Features</a></li>
        <li><a href="/pricing" className="nav-link px-2 text-white">Pricing</a></li>
        <li><a href="/faq" className="nav-link px-2 text-white">FAQs</a></li>
        <li><a href="/about" className="nav-link px-2 text-white">About</a></li>
      </ul>
      <div className="text-end">
        <button type="button" className="btn btn-outline-light me-2">Login</button>
        <button type="button" className="btn btn-warning">Sign-up</button>
      </div>
    </div>
  );
}

export default Navbar;
