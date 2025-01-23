import Select from '../../../components/Form/Select';
import useSkillStore from '../../../store/skill.store';

interface ISelected {
  onHandleSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

function Selected({ onHandleSelect }: ISelected) {
  const { skills, fetch } = useSkillStore((state) => state);
  skills.length === 0 && fetch();
  return (
    <form>
      <div className="mb-3 d-flex flex-column justify-content-center align-items-center ">
        <div className="alert alert-warning alert-dismissible fade show form-text fs-6" role="alert">
          <strong>Attention ! </strong>
          Vous n&apos;avez pas choisi de compétence à afficher.
          Veuillez choisir une compétence dans la liste déroulante ci-dessous.
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
        </div>

        <Select
          title="Compétence"
          list={skills.map((skill) => ({ id: skill.id, label: skill.name }))}
          name="jobSkill"
          handleChange={onHandleSelect}
          value={0}
          placeholder="Choix Compétence"
          style={{ width: '300px' }}
          className='fs-6'
        />
      </div>
    </form>
  );
}

export default Selected;
