import React, { useContext, useEffect, useState, useRef } from 'react';
import { UserContext } from '../contexts/UserContext';
import { fetchUsers } from '../utils/api';
import UserCard from './UserCard';
import LoadingIndicator from './LoadingIndicator';

const UserList = () => {
  const { users, setUsers } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      const getUsers = async () => {
        try {
          const usersData = await fetchUsers();
          setUsers(usersData);
        } catch (error) {
          console.error('Error fetching users:', error);
        } finally {
          setLoading(false);
        }
      };
      getUsers();
      hasFetched.current = true;
    }
  }, [setUsers]);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        {users.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserList;
