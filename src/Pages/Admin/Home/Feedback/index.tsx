import { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import IFeedback from '../../../../@types/Home/feedback';
import { ErrorSanctionProps } from '../../../../@types/error';

function ListFeedBack() {
  const [feedbackList, setFeedbackList] = useState<IFeedback[]>([]);
  const fetchData = async () => {
    try {
      const response = await axios.get('https://www.mimouss.fr/feedback');
      setFeedbackList(response.data);
    } catch (error) {
      const { response } = error as ErrorSanctionProps;
      toast.error(`🦄 ${response.data.error || response.data.message} ! `);
    }
  };
  const handleSwitch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const response = await axios.put(`https://www.mimouss.fr/feedback/${event.target.id}`, {
        draft: event.target.checked,
      });
      setFeedbackList((prev) => prev.map((newsItem) => {
        if (newsItem.id === Number(event.target.id)) {
          return { ...newsItem, draft: !event.target.checked };
        }
        return newsItem;
      }));
      toast.success(`🦄 ${response.data.message} !`);
    } catch (error) {
      const { response } = error as ErrorSanctionProps;
      toast.error(`🦄 ${response.data.error || response.data.message} ! `);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center">Liste des feedback</h1>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Nom</th>
                <th scope="col">Email</th>
                <th scope="col">Message</th>
                <th scope="col">Path</th>
                <th scope="col">Date</th>
                <th scope="col">Traité</th>
              </tr>
            </thead>
            <tbody>
              {feedbackList.map((feedback: IFeedback) => (
                <tr key={feedback.id}>
                  <td>{feedback.name}</td>
                  <td>{feedback.email}</td>
                  <td>{feedback.message}</td>
                  <td>{feedback.path}</td>
                  <td>{dayjs(feedback.created_at).format('DD/MM/YYYY')}</td>
                  <td>
                    <div className="form-check form-switch ">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        defaultChecked={feedback.draft}
                        id={feedback.id.toString()}
                        onChange={handleSwitch}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ListFeedBack;
