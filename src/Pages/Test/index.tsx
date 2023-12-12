import { useEffect, useRef, useState } from 'react';
import './SphereText.scss';

function SphereOfWords() {
  const words = [
    'React',
    'GraphQL',
    'TypeScript',
    'Prisma',
    'Apollo',
    'NodeJS',
    'Express',
    'JWT',
    'Figma',
    'Git',
    'Netlify',
    'Heroku',
    'Angular',
    'SSR',
    '_Lodash',
    'Python',
    'Redux',
    'REST',
    'Cloudinary',
    'Firebase',
    'SCSS',
    'TDD',
    'Ionic',
  ];
  const [hovered, setHover] = useState<string | null>(null);
  const [pointerPosition, setPointerPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const sphereRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    setPointerPosition({ x: e.clientX, y: e.clientY });
  };

  const handleWordHover = (word: string) => {
    setHover(word);
  };

  const handleWordLeave = () => {
    setHover(null);
  };

  useEffect(() => {
    if (sphereRef.current) {
      const sphere = sphereRef.current;
      const numberOfWords = words.length;
      const radius = 100;

      const angleIncrement = (2 * Math.PI) / numberOfWords;

      words.forEach((word, index) => {
        const angle = index * angleIncrement;

        // La position des mots dépend maintenant de la position du pointeur
        const x = pointerPosition.x + radius * Math.cos(angle);
        const y = pointerPosition.y + radius * Math.sin(angle);
        const z = Math.random() * 100;

        const wordElement = document.createElement('div');
        wordElement.textContent = word;
        wordElement.className = `word ${hovered === word ? 'hovered' : ''}`;
        wordElement.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${z}px)`;

        wordElement.addEventListener('mouseover', () => handleWordHover(word));
        wordElement.addEventListener('mouseleave', handleWordLeave);

        sphere.appendChild(wordElement);
      });
    }
  }, [hovered, words, pointerPosition]);

  return (
    <div className="sphere-container" onMouseMove={handleMouseMove}>
      <div className={`sphere ${hovered ? 'hovered' : ''}`} ref={sphereRef} />
    </div>
  );
}

export default SphereOfWords;
