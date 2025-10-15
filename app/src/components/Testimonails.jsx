import React from 'react';
import { testimonialsData } from '../assets/assets';

const Testimonails = () => {
  return (
    <div className='container mx-auto py-10 lg:px-32 w-full overflow-hidden' id='Testimonails'>
      <h1 className='text-2xl sm:text-4xl font-bold mb-2 text-center'>
        Opiniões em <span className='underline underline-offset-4 decoration-1 font-light'>alta</span>
      </h1>
      <p className='text-center text-gray-500 mb-12 max-w-80 mx-auto'>
        Descubra o que moradores e visitantes estão falando sobre os lugares mais amados de Queimadas!
      </p>

      <div className='flex flex-wrap justify-center gap-8'>
        {testimonialsData.map((testimonial, index) => (
          <div key={index} className='max-w-[340px] border shadow-lg rounded px-8 py-12 text-center'>
            <img
              className='w-20 h-20 rounded-full mx-auto mb-4'
              src={testimonial.image}
              alt={testimonial.alt}
            />
            <h2 className='text-xl text-gray-700 font-medium'>{testimonial.name}</h2>
            <p className='text-gray-500 mb-4 text-sm'>{testimonial.title}</p>

            <div className='flex justify-center gap-1 text-red-center mb-4'>
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <img
                  key={i}
                  src="/src/assets/star.png"
                  alt="estrela"
                  className='w-5 h-5'
                />
              ))}
            </div>

            <p className='mt-4 text-gray-600 italic'>"{testimonial.text}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonails;
