function Footer() {
  return (
    <footer>
      <div
        className=" d-flex flex-wrap justify-content-between align-items-center py-3 border-top vw-100 px-5"
        style={{ backgroundColor: '#1d1d20' }}
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
        <span className="">
          <a className="" href="/about">About</a>
        </span>

      </div>
    </footer>
  );
}

export default Footer;
