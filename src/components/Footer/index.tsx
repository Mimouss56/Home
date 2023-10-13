function Footer() {
  return (
    <footer>
      <div className="fixed-bottom d-flex flex-wrap justify-content-around align-items-center py-3 border-top bg-dark px-2">
        <div className="col-md-4 d-flex align-items-center">
          <span className="mb-3 mb-md-0 text-white ">
            © 2023 author : Mouss
          </span>
        </div>
        <span className="col-md-4 d-flex align-items-center justify-content-md-end justify-content-center mb-3 mb-md-0 me-md-auto text-white">
          featuring
          <a href="https://chat.openai.com" className="px-1">
            <img src="https://img.icons8.com/color/25/chatgpt.png" alt="chatgpt" />
          </a>
        </span>
        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <a className="text-white" href="/swagger-ui">
              <img src="https://seeklogo.com/images/S/swagger-logo-A49F73BAF4-seeklogo.com.png" width="25" alt="Swagger" />
            </a>
          </li>
          <li className="ms-3"><a className="text-white" href="/about">About</a></li>

        </ul>
      </div>
    </footer>
  );
}

export default Footer;
