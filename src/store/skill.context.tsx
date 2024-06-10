import {
  ReactElement, ReactNode, createContext, useMemo, useState,
} from 'react';
import { toast } from 'react-toastify';
import { IEntreprise } from '../@types/Home/ent';
import axiosInstance from '../utils/axios';
import { ISoftSkill } from '../@types/Home/softSkill';

interface IEntContext {
  skills: ISoftSkill[] | [];
  setSkills: (competences: ISoftSkill[]) => void;
}

const softSkillContext = createContext<IEntContext>({
  skills: [],
  setSkills: () => { },
});

function SoftSkillProvider({ children }: { children: ReactNode }): ReactElement {
  const [skills, setSkills] = useState<IEntreprise[] | []>([]);
  if (!skills || skills.length === 0) {
    axiosInstance.get('/api/home/softskill')
      .then((res) => {
        // on trie par ordre alphabétique
        const sortSkills = res.data.sort(
          (a: ISoftSkill, b: ISoftSkill) => a.name.localeCompare(b.name),
        );
        setSkills(sortSkills);
      })
      .catch((err) => {
        toast.error(`Une erreur est survenue : ${err.message}`);
      });
  }

  const value = useMemo(() => ({ skills, setSkills }), [skills, setSkills]);
  return (
    <softSkillContext.Provider value={value}>
      {children}
    </softSkillContext.Provider>
  );
}

export {
  softSkillContext,
  SoftSkillProvider,
};
