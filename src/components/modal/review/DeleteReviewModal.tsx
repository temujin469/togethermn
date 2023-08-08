import React, { useState } from 'react';
import Modal from '../Modal';
import { Button } from '@/components/ui/button';

function DeleteReviewModal({reviewId}:{reviewId:number}) {
  const [open, setOpen] = useState(false)

  const handleDelete = () => {
    setOpen(true)
  }
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      trigger={
        <Button className='flex-[1] sm:flex-[0]' onClick={handleDelete} >
          Устгах
        </Button>
      } title='Устгах'
      description='Та энэ сэтгэгдлийг  устгахдаа итгэлтэй байна уу?'
    />
  );
}

export default DeleteReviewModal;
