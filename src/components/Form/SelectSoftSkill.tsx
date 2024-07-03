import { useState, useEffect, useContext } from 'react';
import { ICreateSoftSkill, ISoftSkill } from '../../@types/Home/softSkill';
import axiosInstance from '../../utils/axios';
import { softSkillContext } from '../../store/skill.context';

interface SkillInputProps {
  onSkillSelected: (skill: ISoftSkill) => void;
  skillsCV: number[] // Skills du CV
}

function SkillInput({ onSkillSelected, skillsCV }: SkillInputProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredSkills, setFilteredSkills] = useState<ISoftSkill[]>([]);
  const { skills, setSkills } = useContext(softSkillContext);

  useEffect(() => {
    if (searchTerm) {
      // on filtre les skills en excluant ceux qui sont déjà dans la skills
      const filtered = skills.filter(
        (skill) => !skillsCV.find((s) => s === skill.id)
          && skill.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredSkills(filtered);
    } else {
      setFilteredSkills([]);
    }
  }, [searchTerm, skills, skillsCV]);

  const handleAddSkill = async () => {
    const newSkill: ICreateSoftSkill = {
      name: searchTerm,
    };

    const response = await axiosInstance.post('/api/home/softskill', newSkill);
    const skill = response.data as ISoftSkill;
    // on ajoute le skill à la liste des skills du context
    setSkills([...skills, skill]);
    onSkillSelected(skill);
  };

  return (
    <>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Skills"
          aria-describedby="basic-addon2"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          name="competences"
        />
        {filteredSkills.length === 0 && searchTerm !== '' && (
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={handleAddSkill}
          >
            Crée le Skill
          </button>
        )}
        {filteredSkills.length === 1 && (
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => onSkillSelected(filteredSkills[0])}
          >
            Selectionner le Skill
          </button>

        )}
      </div>

      {filteredSkills.map((skill) => (

        <span
          key={skill.id}
          className=" align-items-center p-1 pe-2 text-light-emphasis bg-light-subtle border-light-subtle"
        >
          {skill.name}
        </span>
      ))}
    </>
  );
}

export default SkillInput;
