function Contact() {
  return (
    <section id="contact" className="py-3 text-white">
      <h1 className="name px-3 fw-bold">LE PRIOL Matthieu</h1>
      <p className="px-3">
        Développeur Application Web et Mobile
      </p>
      <h2 id="title_contact" className="p-3 fw-bold fs-5">Contact</h2>
      <div id="contact">
        <div className="px-3 mt-2" id="info">
          <p id="email" className="mb-1">lepriol.matthieu@gmail.com</p>
          <p id="phone" className="mb-1">06.49.38.99.05</p>
          <p id="adress" className="mb-1">Belz, Morbihan, France</p>
        </div>
        <div id="site" className="d-flex flex-column items-align-between px-3 py-0">
          <p id="website" className="mb-0">
            {/* Logo Web */}
            <a href="https://www.mimouss.fr">Site Web</a>
          </p>
          <p id="github" className="mb-0">
            {/* Logo GitHub */}
            <a href="https://www.github.com/Mimouss56">
              <img src="https://img.icons8.com/ios-filled/32/ffffff/github.png" alt="GitHub" />
            </a>
            <a href="https://www.linkedin.com/in/matthieu-le-priol56/">
              <img src="https://img.icons8.com/ios-filled/32/ffffff/linkedin.png" alt="LinkedIn" />
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Contact;