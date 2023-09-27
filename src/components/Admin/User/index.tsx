import { useEffect, useState } from 'react';
import axiosInstance from '../../../utils/axios';
import { User as IUser } from '../../../@types/user';

function User() {
  const [users, setUsers] = useState<IUser[]>([]);
  const fetchUsers = async () => {
    const response = await axiosInstance.get('/user');
    setUsers(response.data);
    console.log(response.data);
  };
  useEffect(
    () => {
      fetchUsers();
    },
    [],
  );

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: IUser) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default User;
