import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../../utils/axios';

import { ICantineStudent, IStudent } from '../../../@types/ESA/student';
import { ErrorSanctionProps } from '../../../@types/error';

export default function PresenceCantine() {
  const [students, setStudents] = useState<ICantineStudent[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const fetchUsers = async (dated: string) => {
    const response = await axiosInstance.get(`/esa/cantine?date=${dated}`);
    // order by last_name puis part first_name
    response.data.sort(
      (a: IStudent, b: IStudent) => (a.last_name > b.last_name ? 1 : -1),
    );
    setStudents(response.data);
  };
  const handleSwitch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const response = await axiosInstance.put(`/esa/cantine/${event.target.id}?date=${selectedDate}`, {
        present: event.target.checked,
      });
      setStudents((prev) => prev.map((newsItem) => {
        if (newsItem.id === Number(event.target.id)) {
          return { ...newsItem, draft: !event.target.checked };
        }
        return newsItem;
      }));
      fetchUsers(selectedDate);
      toast.success(`🦄 ${response.data.message} !`);
    } catch (error) {
      const { response } = error as ErrorSanctionProps;
      toast.error(`🦄 ${response.data.error || response.data.message} ! `);
    }
  };

  useEffect(() => {
    fetchUsers(selectedDate);
  }, [selectedDate]);

  return (
    <article>
      <div className="d-flex justify-content-between">
        <h1>Cantine</h1>
        <input
          type="date"
          defaultValue={selectedDate}
          onChange={(e) => { setSelectedDate(e.target.value); }}
        />
      </div>
      <article>
        <div className="table-responsive">
          <table className="table table-responsive-sm table-hover table-bordered">
            <thead>
              <tr>
                <th scope="col">Elève</th>
                <th scope="col">Classe</th>
                <th scope="col">Prévu</th>
                <th scope="col">Présent</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr
                  key={student.id}
                >
                  <td>{`${student.last_name} ${student.first_name}`}</td>
                  <td>{student.classe}</td>
                  {/* //Prévu */}
                  <td />
                  <td>
                    <div className="form-check form-switch ">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        checked={student.present}
                        id={student.id.toString()}
                        onChange={handleSwitch}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

    </article>
  );
}
