import { create } from 'zustand';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { ISoftSkill } from '../@types/Home/softSkill';
import axiosInstance from '../utils/axios';

interface SkillStore {
  skills: ISoftSkill[];
  addSkills: (skills: ISoftSkill[]) => void;
  fetch: () => Promise<void>;
}

const useSkillStore = create<SkillStore>((set) => ({
  skills: [],
  addSkills: (skills) => set((state) => ({ skills: [...state.skills, ...skills] })),
  fetch: async () => {
    try {
      const response = await axiosInstance.get('/api/home/softskill');
      const sortedSkills = response.data.sort(
        (a: ISoftSkill, b: ISoftSkill) => a.name.localeCompare(b.name),
      );
      set({ skills: sortedSkills });
    } catch (error) {
      const err = error as Error;
      toast.error(`Une erreur est survenue : ${err.message}`);
    }
  },
}));

export default useSkillStore;

// ajout d'un loader pour le chargement des skills

function SkillLoader() {
  const { skills, fetch } = useSkillStore((state) => state);
  useEffect(() => {
    if (skills.length === 0) {
      fetch();
    }
  }, [fetch, skills.length]);
  return null;
}

export { SkillLoader };
