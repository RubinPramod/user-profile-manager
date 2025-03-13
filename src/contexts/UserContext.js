import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const updateUser = (updatedUser) => {
    console.log("updateUser", updatedUser);
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  const deleteUser = (userId) => {
    console.log("delete");
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  return (
    <UserContext.Provider value={{ users, setUsers, updateUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};
