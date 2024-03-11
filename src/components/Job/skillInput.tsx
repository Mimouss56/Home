import { useState, useEffect } from 'react';
import { ICreateSkill, ISkill } from '../../@types/Home/skill';
import axiosInstance from '../../utils/axios';

interface SkillInputProps {
  onSkillSelected: (skill: ISkill) => void;
  skills: number[] // Skills du CV
  listSkills: ISkill[] // Liste completes des skills
}

function SkillInput({ onSkillSelected, skills, listSkills }: SkillInputProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredSkills, setFilteredSkills] = useState<ISkill[]>([]);

  useEffect(() => {
    if (searchTerm) {
      // on filtre les skills en excluant ceux qui sont déjà dans la skills
      const filtered = listSkills.filter(
        (skill: ISkill) => !skills.find((s) => s === skill.id)
          && skill.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredSkills(filtered);
    } else {
      setFilteredSkills([]);
    }
  }, [searchTerm, listSkills, skills]);

  const handleAddSkill = async () => {
    const newSkill: ICreateSkill = {
      name: searchTerm,
    };

    const response = await axiosInstance.post('/api/home/skill', newSkill);
    const skill = response.data as ISkill;
    // on ajoute le skill à la liste des skills
    listSkills.push(skill);
    onSkillSelected(skill);
  };

  return (
    <>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Skills"
          aria-label="Recipient's username"
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
