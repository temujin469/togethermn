// import components
import { H2 } from '../ui/Typography/Heading';
import Container from '../ui/container';
import TestimonialSlider from './TestimonialSlider';

const Testimonial = () => {
  return (
    <div className=' bg-secondary/20'>
      <Container>

        <section className='mb-20'>
          <div className='xl:container mx-auto'>
            <div className=' max-h-[600px] py-20 sm:m-12 xl:m-16'>
              <div className='text-center'>
                <H2 data-aos='fade-up'
                  data-aos-offset='200' className="mb-10 text-gray-800">Манай үйлчлүүлэгчидийн сэтгэгдэл</H2>
              </div>
              {/* slider */}
              <div data-aos='fade-up'>
                <TestimonialSlider />
              </div>
            </div>
          </div>
        </section>
      </Container>
    </div>


  );
};

export default Testimonial;