import { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axios';
import { ICreateSkill, ISkill } from '../../@types/Home/skill';

interface SkillInputProps {
  onSkillSelected: (skill: ISkill) => void;
}

function SkillInput({ onSkillSelected }: SkillInputProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [skills, setSkills] = useState<ISkill[]>([]);
  const [filteredSkills, setFilteredSkills] = useState<ISkill[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      const response = await axiosInstance.get('/api/home/skill');
      setSkills(response.data);
    };

    fetchSkills();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = skills.filter(
        (skill) => skill.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredSkills(filtered);
    } else {
      setFilteredSkills([]);
    }
  }, [searchTerm, skills]);

  const handleAddSkill = async () => {
    const newSkill: ICreateSkill = {
      name: searchTerm,
    };

    const response = await axiosInstance.post('/api/home/skill', newSkill);
    setSkills((prevSkills) => [...prevSkills, response.data]);
    onSkillSelected(response.data);
    setSearchTerm('');
  };

  return (
    <div className="mb-3">
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Skills"
        className="form-control"
      />
      {filteredSkills.length === 0 && searchTerm !== '' && (
        <button type="button" className="btn btn-primary mt-2" onClick={handleAddSkill}>Add Skill</button>
      )}
      {filteredSkills.map((skill) => (

        <span
          key={skill.id}
          className="badge text-bg-secondary rounded-pill mb-2"
        >
          {skill.name}
        </span>
      ))}
    </div>
  );
}

export default SkillInput;
