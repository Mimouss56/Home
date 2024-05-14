function Footer() {
  return (
    <footer
      className="d-flex flex-wrap justify-content-between align-items-center py-3 border-top vw-100 px-5 bg-dark bottom-0"
      // style={{ backgroundColor: '#1d1d20' }}
      id="footer-header"
    >
      <div className="d-flex align-items-center">
        <span className="">
          © 2023 author : Mouss &
          <a href="https://chat.openai.com" className="px-1">
            <img src="https://img.icons8.com/color/25/chatgpt.png" alt="chatgpt" />
          </a>
          design with
          <a href="https://getbootstrap.com/" className="px-1">
            <img src="https://img.icons8.com/color/25/bootstrap.png" alt="bootstrap" />
          </a>
        </span>
      </div>
      <span className="">
        <a className="" href="/swagger-home">
          <img src="https://seeklogo.com/images/S/swagger-logo-A49F73BAF4-seeklogo.com.png" width="25" alt="Swagger" />
        </a>

      </span>
      <div>
        <a className="text-white mx-2 link-underline link-underline-opacity-0" href="/about">About</a>
        <a className="text-white mx-2 link-underline link-underline-opacity-0" href="/changelog">Changelog</a>

      </div>
    </footer>
  );
}

export default Footer;
