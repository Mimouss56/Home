function Footer() {
  return (
    <footer>
      <div className="fixed-bottom d-flex flex-wrap justify-content-between align-items-center py-3 border-top bg-dark vw-100 px-5">
        <div className="d-flex align-items-center">
          <span className="text-white ">
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
          <a className="text-white" href="/swagger-ui">
            <img src="https://seeklogo.com/images/S/swagger-logo-A49F73BAF4-seeklogo.com.png" width="25" alt="Swagger" />
          </a>

        </span>
        <span className="">
          <a className="text-white" href="/about">About</a>
        </span>

      </div>
    </footer>
  );
}

export default Footer;
