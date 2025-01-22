import useSkillStore from '../../../store/skill.store';

interface ISelected {
  onHandleSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

function Selected({ onHandleSelect }: ISelected) {
  const { skills } = useSkillStore((state) => state);
  return (
    <form>
      <div className="mb-3 d-flex flex-column justify-content-center align-items-center ">
        <div className="alert alert-warning alert-dismissible fade show form-text fs-6" role="alert">
          <strong>Attention ! </strong>
          Vous n&apos;avez pas choisi de compétence à afficher.
          Veuillez choisir une compétence dans la liste déroulante ci-dessous.
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
        </div>

        <div className="input-group fs-6" style={{ width: '300px' }}>
          <span className="input-group-text" id="job-skill">Compétence</span>
          <select
            id="jobSkill"
            className="form-select form-control"
            aria-label="Liste Compétence Emploi"
            aria-describedby="job-skill"
            defaultValue={0}
            onChange={(e) => onHandleSelect(e)}
          >
            <option value={0}>Choix Compétence</option>
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
      </div>
    </form>
  );
}

export default Selected;
