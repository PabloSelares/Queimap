import React from 'react';
import TurismoImg from '../assets/Turismo.jpg';

const About = () => {
  return (
    <div
      className="flex flex-col items-center justify-center text-center container mx-auto p-14 md:px-20 lg:px-32 w-full overflow-hidden"
      id="Sobre"
    >
      <h1 className="text-2xl sm:text-4xl font-bold mb-2">
        Bem-vindo ao{' '}
        <span className="underline underline-offset-4 decoration-1 font-light">
          Queimap
        </span>
      </h1>
      <p className="text-gray-500 max-w-xl text-center mb-8">
        Um guia rápido para você descobrir os pontos turísticos, restaurantes e
        a cultura de Queimadas/PB.
      </p>

      <div className="flex flex-col md:flex-row items-center md:items-start md:gap-20">
        <img
          src={TurismoImg}
          alt="Turismo em Queimadas"
          className="w-full sm:w-1/2 max-w-lg object-cover rounded-t-full shadow-lg"
        />

        <div className="flex flex-col items-center md:items-start mt-10 md:mt-0 text-gray-600">
          <div className="grid grid-cols-2 gap-6 md:gap-10 w-full 2xl:pr-28 text-center md:text-left">
            <div>
              <p className="text-4xl font-medium text-gray-800">47.658+</p>
              <p>habitantes</p>
            </div>
            <div>
              <p className="text-4xl font-medium text-gray-800">402,9 km²</p>
              <p>de área</p>
            </div>
            <div>
              <p className="text-4xl font-medium text-gray-800">118 hab/km²</p>
              <p>densidade populacional</p>
            </div>
            <div>
              <p className="text-4xl font-medium text-gray-800">0,608</p>
              <p>IDH (médio)</p>
            </div>
          </div>
          <p className='my-10 max-w-lg'>Queimadas, no coração da Paraíba, encanta com sua história, cultura viva e tradições centenárias. Descubra seus recantos, experimente a culinária típica e deixe-se surpreender por cada detalhe da cidade!</p>
        <button className="bg-orange-500 text-white px-8 py-2 rounded hover:bg-orange-600 transition-colors"> Saber Mais</button>
        </div>
      </div>
    </div>
  );
};

export default About;
