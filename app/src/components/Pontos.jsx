import React, { useState, useEffect } from 'react';
import { HiOutlineArrowSmallLeft, HiOutlineArrowSmallRight } from "react-icons/hi2";
import { pontosData } from "../assets/assets";

const Pontos = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(1);

  useEffect(() => {
    const updateCardsToShow = () => {
      if (window.innerWidth >= 1024) setCardsToShow(3); // telas grandes
      else if (window.innerWidth >= 640) setCardsToShow(2); // médias
      else setCardsToShow(1); // pequenas
    };

    updateCardsToShow(); // chama a função logo que o componente monta
    window.addEventListener('resize', updateCardsToShow);

    return () => window.removeEventListener('resize', updateCardsToShow);
  }, []);

  const nextPonto = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === pontosData.length - cardsToShow ? 0 : prevIndex + 1
    );
  };

  const prevPonto = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? pontosData.length - cardsToShow : prevIndex - 1
    );
  };

  return (
    <div
      className="container mx-auto py-4 pt-20 px-6 md:px-20 lg:px-32 my-20 w-full overflow-hidden"
      id="pontos"
    >
      <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-center">
        Pontos{" "}
        <span className="underline underline-offset-4 decoration-1 font-light">
          Turísticos
        </span>
      </h1>
      <p className="text-center text-gray-500 mb-8 max-w-80 mx-auto">
        Descubra lugares incríveis, histórias marcantes e experiências inesquecíveis.
      </p>

      {/* Botões de navegação */}
      <div className="flex justify-end items-center mb-8">
        <button
          onClick={prevPonto}
          className="p-3 bg-gray-200 rounded mr-2 hover:bg-gray-300"
          aria-label="Ponto Turístico Anterior"
        >
          <HiOutlineArrowSmallLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextPonto}
          className="p-3 bg-gray-200 rounded hover:bg-gray-300"
          aria-label="Próximo Ponto Turístico"
        >
          <HiOutlineArrowSmallRight className="w-5 h-5" />
        </button>
      </div>

      {/* Grid de pontos turísticos */}
      <div className="overflow-hidden">
        <div
          className="flex gap-8 transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`,
          }}
        >
          {pontosData.map((ponto, index) => (
            <div
              key={index}
              className="relative flex-shrink-0 group"
              style={{ flex: `0 0 ${100 / cardsToShow}%` }}
            >
              <div className="w-full h-64 overflow-hidden rounded-lg shadow-md relative">
                <img
                  src={ponto.image}
                  alt={ponto.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Hover info */}
                <div className="absolute left-0 right-0 bottom-5 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="inline-block bg-white/90 w-3/4 px-4 py-3 shadow-md text-center rounded">
                    <h2 className="text-lg font-semibold text-orange-900">
                      {ponto.title}
                    </h2>
                    <p className="text-sm text-orange-500 mt-1">
                      {ponto.location}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-3 text-center">
                <p className="text-gray-600 text-sm">{ponto.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pontos;
