interface IStudy {
  ent: string
  title: string
  date: {
    debut: string,
    fin: string
  },
  lieu: {
    ville: string,
    departement: string
  },
  description: string,
}

function DetailsStudy({
  ent,
  title,
  date,
  lieu,
  description,
}: IStudy) {
  return (
    <article id="xp_1" className="d-flex align-items-center">
      <p id="xp_date" className="col-2 px-2">
        {`${date.debut} - ${date.fin}`}
      </p>
      <div className="d-flex flex-column col-10 px-2">
        <div id="ent" className="d-flex justify-content-between">
          <p id="xp_title" className="fs-6 fw-bold text-center">{description}</p>
          <p id="xp_ent" className="fst-italic text-left">{`${ent}, ${lieu.ville}(${lieu.departement})`}</p>
        </div>
        <div id="xp_skills">
          <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex flex-wrap pt-0 flex-column">
              <span>{title}</span>
            </li>
          </ul>
        </div>
      </div>
    </article>

  );
}

export default DetailsStudy;
