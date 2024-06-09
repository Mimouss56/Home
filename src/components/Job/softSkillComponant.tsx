/* eslint-disable max-len */
import { useContext, useState } from 'react';
import { ISoftSkill } from '../../@types/Home/softSkill';
import SkillInput from '../Input/SelectSoftSkill';
import { softSkillContext } from '../../store/skill.context';

function SoftSkillInput({ actualSkills, onChange }: { actualSkills: ISoftSkill[], onChange: (arg0: ISoftSkill) => void; }) {
  const [addInput, setAddInput] = useState(false);
  const { skills } = useContext(softSkillContext);

  return (
    <div className="input-group mb-3">
      {/* // List des ID des Skills */}
      {actualSkills.map((skillID) => (
        <span
          key={skillID.id}
          className="badge d-flex align-items-center p-1 pe-2 border rounded-pill text-light-emphasis bg-light-subtle border-light-subtle"
        >
          {skills.find((skill: ISoftSkill) => skill.id === skillID.id)?.name}
          <span className="vr mx-2" />
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            // onClick={(e)=>handleDeleteSkill}
            id={skillID.toString()}
          >
            <i className="bi bi-x" />
          </button>
        </span>
      ))}
      {/* // Add Skill Button */}
      {!addInput && (
        <button
          className="btn rounded-pill bg-success-subtle"
          type="button"
          onClick={() => setAddInput(!addInput)}
        >
          <i className="bi bi-plus-circle" />
        </button>
      )}

      {/* // Input Skill */}
      {addInput && (
        <SkillInput
          onSkillSelected={(skill) => {
            onChange(skill);
            setAddInput(false);
          }}
          skillsCV={actualSkills.flatMap((c) => c.id)}
        />
      )}

    </div>
  );
}

export default SoftSkillInput;
