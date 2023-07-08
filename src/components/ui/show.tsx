import React from 'react';

function Show({isShow,children}:{isShow?:boolean,children:React.ReactNode}) {
  return !isShow ? null :  children
}

export default Show;
