function Footer() {
  return (
    <footer>
      <div className="fixed-bottom d-flex flex-wrap justify-content-around align-items-center py-3 border-top bg-dark">
        <div className="col-md-4 d-flex align-items-center">
          <span className="mb-3 mb-md-0 text-white">© 2023 author : Mouss</span>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3"><a className="text-white" href="/about">About</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
