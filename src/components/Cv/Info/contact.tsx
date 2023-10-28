function Contact() {
  return (
    <section id="contact" className="py-3 text-white">
      <h1 className="name px-3 fw-bold">LE PRIOL Matthieu</h1>
      <p className="px-3">
        {'En pleine reconversion, je suis passionné d\'informatique et spécialisé en développement web fullstack JavaScript. Autonome et autodidacte, j\'ai acquis des compétences solides dans ce domaine en suivant ma passion.'}
      </p>
      <h2 id="title_contact" className="p-2 fw-bold fs-5">Contact</h2>
      <div id="contact">
        <div className="px-3 mt-2" id="info">
          <p id="email" className="mb-1">lepriol.matthieu@gmail.com</p>
          <p id="phone" className="mb-1">06.49.38.99.05</p>
          <p id="adress" className="mb-1">Belz, Morbihan, France</p>
        </div>
        <div id="site" className="d-flex flex-column items-align-between px-3 py-0">
          <p id="website" className="mb-1">
            <a href="https://www.mimouss.fr" className="link-light noprint">
              <img src="https://img.icons8.com/ios-filled/32/ffffff/domain.png" alt="Site Web" />
              https://www.mimouss.fr
            </a>
          </p>
          <p id="github" className="mb-1">
            {/* Logo GitHub */}
            <a href="https://www.github.com/Mimouss56" className="link-light noprint">
              <img src="https://img.icons8.com/ios-filled/32/ffffff/github.png" alt="GitHub" />
              https://www.github.com/Mimouss56
            </a>
          </p>
          <p id="linkedin" className="mb-1">
            <a href="https://www.linkedin.com/in/matthieu-le-priol56/" className="link-light noprint">
              <img src="https://img.icons8.com/ios-filled/32/ffffff/linkedin.png" alt="LinkedIn" />
              https://www.linkedin.com/in/matthieu-le-priol56/
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Contact;
