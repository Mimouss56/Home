interface ISelected {
  skills: ISkill[];
  onHandleSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

interface ISkill {
  id: number;
  name: string;
}

function Selected({ skills, onHandleSelect }: ISelected) {
  return (
    <form>
      <div className="mb-3">
        <div className="input-group">
          <span className="input-group-text" id="job-skill">Job Compétence</span>
          <select
            id="jobSkill"
            className="form-select form-control"
            aria-label="Liste Compétence Emploi"
            aria-describedby="job-skill"
            defaultValue={0}
            onChange={(e) => onHandleSelect(e)}
          >
            <option value={0}>Choisir Compétence Emploi</option>
            {skills.map((skill) => (
              <option
                key={skill.id}
                value={skill.name}
              >
                {skill.name}

              </option>
            ))}

          </select>
        </div>
        <div className="alert alert-warning alert-dismissible fade show form-text" role="alert">
          <strong>Attention ! </strong>
          Vous n&apos;avez pas choisi de compétence à afficher.
          Veuillez choisir une compétence dans la liste déroulante ci-dessous.
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
        </div>
      </div>

      <div className="mb-3" />
    </form>
  );
}

export default Selected;
