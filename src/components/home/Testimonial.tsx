// import components
import { H2 } from '../ui/Typography/Heading';
import Container from '../ui/container';
import TestimonialSlider from './TestimonialSlider';

const Testimonial = () => {
  return (
    <Container>

    <section className='mb-16'>
      <div className='xl:container mx-auto'>
        <div className='bg-bgClr max-h-[500px] py-8 sm:p-12 xl:p-16 rounded-lg'>
          <div className='text-center'>
            <H2 data-aos='fade-up'
              data-aos-offset='200' className="mb-10">Манай үйлчлүүлэгчидийн сэтгэгдэл</H2>
          </div>
          {/* slider */}
          <div data-aos='fade-up'>
            <TestimonialSlider />
          </div>
        </div>
      </div>
    </section>
    </Container>
  );
};

export default Testimonial;