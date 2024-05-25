import React from 'react';
import NavBar from '../components/NavBar';
import { Outlet } from 'react-router-dom';

const AppLayout = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="container mx-auto p-4">
        <Outlet />
      </div>
    </>
  );
};

export default AppLayout;
