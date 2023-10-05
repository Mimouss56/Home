import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import axiosInstance from '../../../utils/axios';
import { User as IUser } from '../../../@types/user';
import { ErrorSanctionProps } from '../../../@types/error';

function User() {
  const [users, setUsers] = useState<IUser[]>([]);
  const fetchUsers = async () => {
    const response = await axiosInstance.get('/user');
    setUsers(response.data);
  };

  const handleChangeRole = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    try {
      await axiosInstance.put(`/user/${event.target.id}`, {
        role: event.target.value,
      });
      fetchUsers();
    } catch (error) {
      const { response } = error as ErrorSanctionProps;
      toast.error(`🦄 ${response.data.error || response.data.message} ! `);
    }
  };

  const handleSwitchChild = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const response = await axiosInstance.put(`/user/${event.target.id}`, {
        child: event.target.checked,
      });
      fetchUsers();
      toast.success(`🦄 ${response.data.message} !`);
    } catch (error) {
      const { response } = error as ErrorSanctionProps;
      toast.error(`🦄 ${response.data.error || response.data.message} ! `);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <table className="table table-responsive-sm table-hover table-bordered">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>!child</th>
            <th>Sanction</th>
            <th>Last Login</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: IUser) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  defaultValue={user.role.id}
                  id={user.id.toString()}
                  onChange={handleChangeRole}
                >
                  <option value="1">Admin</option>
                  <option value="2">User</option>
                </select>
              </td>
              <td className="text-center">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    checked={!user.child}
                    id={user.id.toString()}
                    onChange={handleSwitchChild}
                  />
                </div>
              </td>
              <td className="text-center">
                {
                  user.child && (
                    <Link to={`/sanction?child=${user.id}`}>
                      {user.sanction.length}
                    </Link>
                  )
                }

              </td>
              <td>{dayjs(user.last_visited).format('DD/MM/YYYY HH:mm:ss')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default User;
