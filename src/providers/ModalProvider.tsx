import LoginModal from '@/components/modal/auth/LoginModal';
import RegisterModal from '@/components/modal/auth/RegisterModal';
import CreateProfile from '@/components/modal/createProfile/CreateProfile';
import React from 'react';

function ModalProvider() {
  return (
    <>
      <LoginModal/>
      <RegisterModal/>
      <CreateProfile/>
    </>
  );
}

export default ModalProvider;
