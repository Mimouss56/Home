/* eslint-disable max-len */
function Dev() {
  return (
    <section id="dev" className="px-3">
      <h2 id="title" className="py-1">Expérience Développeur</h2>

      <article id="xp_1" className="d-flex align-items-center">
        <p id="xp_date" className="col-2 px-2">2023</p>
        <div className="d-flex flex-column col-10 px-2">
          <div id="ent" className="">
            <span id="xp_title" className="fs-6 fw-bold text-start">Développeur JS</span>
          </div>
          <div id="xp_skills">
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex flex-wrap pt-0 flex-column">
                <span>Création d&apos;une application web sous ReactJS et NodeJS</span>
                <span>(système de collaboration entre développeurs pour du pair-programming.)</span>
                <a className="fst-italic text-end" href="https://oside.mimouss.fr"><p className="mb-0">O&apos;Side Project</p></a>
              </li>
              <li className="list-group-item d-flex flex-wrap pt-0 flex-column">
                <span>Création d&apos;une application pour une communauté de joueurs.</span>
                <span>(Authentification via Discord, Gestion de dons)</span>
                <a className="fst-italic text-end" href="https://bbc.mimouss.fr"><p className="mb-0">BelBreizh Crew</p></a>
              </li>
            </ul>
          </div>

          <p id="xp_skills" className="mb-0 " />
        </div>
      </article>

      <article id="xp_1" className="d-flex align-items-center">
        <p id="xp_date" className="col-2 px-2">2013-2022</p>
        <div className="d-flex flex-column col-10 px-2">
          <div id="ent" className="d-flex justify-content-between">
            <span id="xp_title" className="fs-6 fw-bold text-start">
              Développeur PHP
            </span>
            <span className="fw-normal fs-6 fst-italic text-end">
              (autodidacte)
            </span>
          </div>
          <div id="xp_skills">
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex flex-wrap pt-0 flex-column">
                <span>Création sous PHP du site de la kermesse de l&apos;école maternelle de Fouras.</span>
                <span>(Gestion complète des lots et des tickets de tombola.)</span>
              </li>
              <li className="list-group-item d-flex flex-wrap pt-0 flex-column">
                <span>Création d&apos;un site de compte rendu hebdomadaire de déplacements professionnels.</span>
                <span>(Gestion d&apos;un backoffice pour plusieurs utilisateurs.)</span>
              </li>
              <li className="list-group-item d-flex flex-wrap pt-0 flex-column">
                <span>Création d&apos;une application pour une communauté de joueurs.</span>
                <span>(Authentification via Discord, Gestion de dons)</span>
                <a className="fst-italic text-end" href="https://bbc.mimouss.fr"><p className="mb-0">BelBreizh Crew</p></a>
              </li>
            </ul>
          </div>
        </div>
      </article>

      <article id="xp_1" className="d-flex align-items-center">
        <p id="xp_date" className="col-2 px-2">2013</p>
        <div className="d-flex flex-column col-10 px-2">
          <div id="ent" className="d-flex justify-content-between">
            <span id="xp_title" className="fs-6 fw-bold text-start">
              Développeur WordPress
            </span>
            <span className="fw-normal fs-6 fst-italic text-end">
              (autodidacte)
            </span>
          </div>
          <div id="xp_skills">
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex flex-wrap pt-0 flex-column">
                <span>Apprentissage de WordPress et des plugins.</span>
                <span>Création du site vitrine du club de handball, gestion complète avec hébergement sous OVH.</span>
                <span>Développement de plugin de gestion des résultats des scores et des classements.</span>
              </li>
            </ul>
          </div>
        </div>
      </article>
    </section>

  );
}

export default Dev;
