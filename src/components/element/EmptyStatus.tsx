import React from 'react';

type Props = {
  message?:string,
}

function EmptyStatus({ message ="Хоосон байна"}:Props) {
  return (
    <div className="flex flex-col items-center justify-center">
      <img src="/images/empty-status.webp" alt="Empty State" className="max-w-[300px]" />
      <p className="text-lg font-bold text-gray-300 text-center">{message}</p>
    </div>
  );
}

export default EmptyStatus;
