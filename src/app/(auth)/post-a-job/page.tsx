import Image from 'next/image';
import SelectProfession from './components/SelectProfession';
import getProfessions from '@/utils/fetch/getProfessions';

 async function PostAJob() {
  const professions = await getProfessions()
  console.log(professions)
  return (
    <div className='min-h-screen bg-white'>
      <div className='md:grid grid-cols-2 h-screen'>
        <div className='col-span-1 hidden md:block m-10  relative'>
          <Image
            fill
            src="https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="model" className='object-cover' />
        </div>
        <div className='p-5 md:p-10  flex justify-center'>
          <div className='max-w-[500px]'>
            <SelectProfession professions={professions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostAJob;
