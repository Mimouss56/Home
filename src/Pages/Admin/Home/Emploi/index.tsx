// on liste les emplois /api/home/emploi

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'bootstrap';
import Card from '../../../../components/Card';
import axiosInstance from '../../../../utils/axios';

function EmploiPage() {
  const [emploi, setEmploi] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState('');

  const fetchEmploi = async () => {
    setLoader(true);
    try {
      const res = await axiosInstance.get('/api/home/emploi');
      setEmploi(res.data);
      setLoader(false);
    } catch (err) {
      setError(err);
      setLoader(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoader(true);
    try {
      await axiosInstance.delete(`/api/home/emploi/${id}`);
      setLoader(false);
    } catch (err) {
      setError(err);
      setLoader(false);
    }
  };

  const handleAdd = () => {
    setModalContent(<FormEmploi />);
    setModal(true);
  };

  useEffect(() => {
    fetchEmploi();
  }, []);
  return (
    <div>
      <h1>Emploi</h1>
      <Button onClick={handleAdd}>Ajouter</Button>
      <div>
        {emploi.length === 0 ? (
          <Loader />
        ) : (
          emploi.map((e) => (
            <Card key={e._id}>
              <h2>{e.title}</h2>
              <p>{e.description}</p>
              <p>{e.date}</p>
              <p>{e.author}</p>
              {user?.role === 'admin' && (
                <div>
                  <Link to={`/admin/home/emploi/${e._id}`}>Modifier</Link>
                  <Button onClick={() => handleDelete(e._id)}>Supprimer</Button>
                </div>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

export default EmploiPage;
