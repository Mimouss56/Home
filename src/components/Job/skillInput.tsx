import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { ISkill } from '../../@types/Home/skill';
import useFetchData from '../../hook/useFetchData';

interface SkillInputProps {
  onSkillSelected: (skill: ISkill) => void;
}

function SkillInput({ onSkillSelected }: SkillInputProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [skills, setSkills] = useState<ISkill[]>([]);
  const [filteredSkills, setFilteredSkills] = useState<ISkill[]>([]);
  const [data, loading, error] = useFetchData('/api/home/skill');
  setSkills(data as ISkill[]);

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

  // const handleAddSkill = async () => {
  //   const newSkill: ICreateSkill = {
  //     name: searchTerm,
  //   };

  //   const response = await axiosInstance.post('/api/home/skill', newSkill);
  //   setSkills((prevSkills) => [...prevSkills, response.data]);
  //   onSkillSelected(response.data);
  //   setSearchTerm('');
  // };
  if (loading) return <p>Loading...</p>;
  if (error) return toast.error(error);

  return (
    <div className="mb-3">
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Skills"
        className="form-control"
      />
      {filteredSkills.length === 0 && searchTerm !== '' && (
        <button
          type="button"
          className="btn btn-primary mt-2"
        // onClick={handleAddSkill}
        >
          Add Skill
        </button>
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
