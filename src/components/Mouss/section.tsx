import { useEffect, useState } from 'react';
import JobList from '../Job';
import ModalAddItem from '../Modal/formJob';
import axiosInstance from '../../utils/axios';
import { Job } from '../../@types/Home/emploi';

interface SectionProps {
  title: string;
  type: string;
}

function Section({ title, type }: SectionProps) {
  const [items, setItems] = useState<Job[]>([]);

  const fetchInfo = async (typeInfo: string) => {
    const response = await axiosInstance.get(`/api/home/${typeInfo}/@me`);
    const { data } = response;
    setItems(data);
  };

  const handleAddElement = (data: Job) => { // Remplacez any par le type approprié
    setItems((prevItems: Job[]) => [...prevItems, data]);
  };

  useEffect(() => {
    fetchInfo(type);
  }, [type]);

  return (
    <>
      <h2>{title}</h2>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addItem"
        data-bs-type={type}
        data-bs-id={0}
      >
        Ajout d&apos;un item
      </button>
      <JobList jobs={items} typeData={type} />
      <ModalAddItem onAddElement={handleAddElement} />
    </>
  );
}

export default Section;
