import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import MessageContainer from './MessageContainer';
import { useSelector } from 'react-redux';
import store from '../redux/store';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { authUser } = useSelector(store => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser === null) {
      navigate('/login');
    }
  }, [authUser, navigate]);
  return (
    <div className='flex h-screen justify-center items-center'>
      <div className='flex overflow-hidden backdrop-blur-md bg-opacity-0 sm:h-[450px] md:h-[550px] rounded-lg'>
        <Sidebar />
        <MessageContainer />
      </div>
    </div>
  );
}

export default HomePage;
