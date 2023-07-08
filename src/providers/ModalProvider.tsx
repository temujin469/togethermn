import LoginModal from '@/components/modal/auth/LoginModal';
import RegisterModal from '@/components/modal/auth/RegisterModal';
import React from 'react';

function ModalProvider() {
  return (
    <>
      <LoginModal/>
      <RegisterModal/>
    </>
  );
}

export default ModalProvider;
