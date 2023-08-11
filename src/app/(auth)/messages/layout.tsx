import Footer from '@/components/footer/Footer';
import Header from '@/components/header';

function layout({children}:{children:React.ReactNode}) {
 
  return (
    <div>
        <Header />
      <div className='flex-[1] bg-white min-h-[calc(100vh-115px)] relative'>
          {children}
      </div>
      <Footer/>
    </div>
  );
}

export default layout;
