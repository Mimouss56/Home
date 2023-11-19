import { useEffect, useState } from 'react';
import Job from '../Job';
import ModalAddItem from '../Modal/formJob';

interface SectionProps {
  title: string;
  initialItems: any[]; // Remplacez any par le type approprié
  type: string;
}

function Section({ title, initialItems, type }: SectionProps) {
  const [items, setItems] = useState(initialItems);

  const handleAddElement = (data: any) => { // Remplacez any par le type approprié
    if (type === 'job') {
      setItems((prevItems: any[]) => [...prevItems, data]);
    } else {
      setItems((prevItems: any[]) => [...prevItems, data]);
    }
  };
  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  return (
    <>
      <h2>{title}</h2>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addItem"
        data-bs-type={type}
      >
        Ajout d&apos;un item
      </button>
      <Job jobs={items} />
      <ModalAddItem onAddElement={handleAddElement} />
    </>
  );
}

export default Section;
