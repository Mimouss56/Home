module.exports = {
  renderCv: (req, res) => {
    
    const data = {      
      title: 'CV',
    };
    res.json(data);
  },
  getSkills: async (req, res) => {
    const skills = await fetch('http://localhost:3000/api/cv/skills');
    const skillsJson = await skills.json();
    res.json(skillsJson);
  },
  getExperiences: async (req, res) => {
    const experiences = await fetch('http://localhost:3000/api/cv/experiences');
    const experiencesJson = await experiences.json();
    res.json(experiencesJson);
  },
  getFormations: async (req, res) => {
    const formations = await fetch('http://localhost:3000/api/cv/formations');
    const formationsJson = await formations.json();
    res.json(formationsJson);
  },
  getLoisirs: async (req, res) => {
    const loisirs = await fetch('http://localhost:3000/api/cv/loisirs');
    const loisirsJson = await loisirs.json();
    res.json(loisirsJson);
  },
  getProjects: async (req, res) => {
    const projects = await fetch('http://localhost:3000/api/cv/projects');
    const projectsJson = await projects.json();
    res.json(projectsJson);
  },

}

