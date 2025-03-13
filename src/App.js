import React from 'react';
import { UserProvider } from './contexts/UserContext';
import UserList from './components/UserList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  return (
    <UserProvider>
      <div className="App">
        <UserList />
      </div>
    </UserProvider>
  );
};

export default App;
