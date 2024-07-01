/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import axiosInstance from '../../../../utils/axios';
import { IUser, IRoleWithoutObject } from '../../../../@types/Home/user';
import { ErrorSanctionProps } from '../../../../@types/error';

function User() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [listRole, setListRole] = useState([]);

  const fetchListRole = async () => {
    const response = await axiosInstance.get('/api/home/role');
    setListRole(response.data);
  };

  const fetchUsers = async () => {
    const response = await axiosInstance.get('/api/home/user');
    setUsers(response.data);
  };

  const handleChangeRole = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    try {
      await axiosInstance.put(`/api/home/user/${event.target.id}`, {
        role: event.target.value,
        option: true,
      });
      fetchUsers();
    } catch (error) {
      const { response } = error as ErrorSanctionProps;
      toast.error(`🦄 ${response.data.error || response.data.message} ! `);
    }
  };

  const handleSwitchChild = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const response = await axiosInstance.put(`/api/home/user/${event.target.id}`, {
        child: event.target.checked,
        option: true,

      });
      fetchUsers();
      toast.success(`🦄 ${response.data.message} !`);
    } catch (error) {
      const { response } = error as ErrorSanctionProps;
      toast.error(`🦄 ${response.data.error || response.data.message} ! `);
    }
  };

  const handleSwitchFamily = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const response = await axiosInstance.put(`/api/home/user/${event.target.id}`, {
        family: event.target.checked,
        option: true,

      });
      fetchUsers();
      toast.success(`🦄 ${response.data.message} !`);
    } catch (error) {
      const { response } = error as ErrorSanctionProps;
      toast.error(`🦄 ${response.data.error || response.data.message} ! `);
    }
  };

  useEffect(() => {
    fetchListRole();
    fetchUsers();
  }, []);

  return (
    <div className="table-responsive">
      <table className="table table-responsive-sm table-hover table-bordered">
        <thead>
          <tr>
            <th>User</th>
            <th className="d-none d-md-block">Email</th>
            <th>Role</th>
            <th>family</th>
            <th>child</th>
            <th>Warn</th>
            <th className="d-none d-md-block">Last Login</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: IUser) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td className="d-none d-md-table-cell">{user.email}</td>
              <td>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={user.role.id.toString()}
                  id={user.id.toString()}
                  onChange={handleChangeRole}
                >
                  {listRole.map((role: IRoleWithoutObject) => (
                    <option
                      key={role.id}
                      value={role.id.toString()}
                    >
                      {role.label}
                    </option>
                  ))}
                </select>
              </td>
              <td className="text-center">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    name="family"
                    checked={!!user.family}
                    id={user.id.toString()}
                    onChange={handleSwitchFamily}
                  />
                </div>
              </td>
              <td className="text-center">
                {user.family && (
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      name="child"
                      checked={user.child}
                      id={user.id.toString()}
                      onChange={handleSwitchChild}
                    />
                  </div>
                )}
              </td>
              <td className="text-center">
                {
                  user.child && user.family && (
                    <Link to={`/sanction?child=${user.id}`}>
                      {user.sanction?.length}
                    </Link>
                  )
                }

              </td>
              <td className="d-none d-md-table-cell">{dayjs(user.last_visited).format('DD/MM/YYYY HH:mm:ss')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default User;
