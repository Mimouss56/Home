const color = 'color';
const size = '40';

function Skills() {
  return (
    <section>
      <h2 id="title_contact" className="p-3 fw-bold fs-5">Technos</h2>
      <div className="px-3 mt-2 text-white">
        <div id="skill">
          <h3 className="fs-5 text-center text-white">Front-end</h3>
          <div className="logo d-flex flex-wrap justify-content-between">
            <img src={`https://img.icons8.com/${color}/${size}/html-5--v1.png`} alt="HTML5" />
            <img src={`https://img.icons8.com/${color}/${size}/css3.png`} alt="CSS3" />
            <img src={`https://img.icons8.com/${color}/${size}/javascript--v1.png`} alt="JavaScript" />
            <img src={`https://img.icons8.com/${color}/${size}/react-native.png`} alt="React" />
            <img src={`https://img.icons8.com/${color}/${size}/redux.png`} alt="Redux" />
            <img src={`https://img.icons8.com/${color}/${size}/typescript.png`} alt="TypeScript" />
            <img src={`https://img.icons8.com/${color}/${size}/bootstrap.png`} alt="Bootstrap" />
            <img src={`https://img.icons8.com/${color}/${size}/ejs.png`} alt="EJS" />
          </div>
        </div>
        <div id="skill">
          <h3 className="fs-5 text-center text-white">Back-end</h3>
          <div className="logo d-flex flex-wrap justify-content-between">
            <img src={`https://img.icons8.com/${color}/${size}/nodejs.png`} alt="NodeJS" />
            <img src={`https://img.icons8.com/${color}/${size}/express.png`} alt="Express" />
            <img src={`https://img.icons8.com/${color}/${size}/postgreesql.png`} alt="PostgreSQL" />
            <img src={`https://img.icons8.com/${color}/${size}/mysql-logo.png`} alt="MySQL" />
            <img src={`https://img.icons8.com/${color}/${size}/php.png`} alt="PHP" />
            <img src="https://seeklogo.com/images/S/swagger-logo-A49F73BAF4-seeklogo.com.png" width={size} alt="Swagger" />
          </div>
        </div>
        <div id="skill">
          <h3 className="fs-5 text-center pt-2 text-white">Outils</h3>
          <div className="d-flex flex-wrap justify-content-between">
            <img src={`https://img.icons8.com/${color}/${size}/visual-studio-code-2019.png`} alt="VSCode" />
            <img src={`https://img.icons8.com/000000/${size}/git.png`} alt="Git" />
            <img src={`https://img.icons8.com/${color}/${size}/github--v1.png`} alt="GitHub" />
            <img src={`https://img.icons8.com/${color}/${size}/discord--v1.png`} alt="Discord" />
            <img src={`https://img.icons8.com/${color}/${size}/wordpress.png`} alt="WordPress" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
