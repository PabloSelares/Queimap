import React, { useState, useEffect, useRef } from 'react';
import { HiOutlineArrowSmallLeft, HiOutlineArrowSmallRight } from 'react-icons/hi2';
import { HiOutlineMapPin } from 'react-icons/hi2'; // ícone de mapa
import { pontosData } from '../assets/assets';

const Pontos = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(1);

  // Modal state
  const [selectedPonto, setSelectedPonto] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const updateCardsToShow = () => {
      if (window.innerWidth >= 1024) setCardsToShow(3);
      else if (window.innerWidth >= 640) setCardsToShow(2);
      else setCardsToShow(1);
    };

    updateCardsToShow();
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

  // Abre modal com os detalhes do ponto
  const openModal = (ponto) => {
    setSelectedPonto(ponto);
  };

  // Fecha modal
  const closeModal = () => {
    setSelectedPonto(null);
  };

  // Abrir Google Maps com lat/lng em nova aba
  const openInMaps = (ponto) => {
    if (ponto?.lat != null && ponto?.lng != null) {
      const url = `https://www.google.com/maps/search/?api=1&query=${ponto.lat},${ponto.lng}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    } else if (ponto?.mapLink) {
      window.open(ponto.mapLink, '_blank', 'noopener,noreferrer');
    } else {
      alert('Localização não disponível para este ponto.');
    }
  };

  // Copiar coordenadas para clipboard
  const copyCoordinates = async (ponto) => {
    if (navigator.clipboard && ponto?.lat != null && ponto?.lng != null) {
      const text = `${ponto.lat}, ${ponto.lng}`;
      try {
        await navigator.clipboard.writeText(text);
        // feedback simples
        alert('Coordenadas copiadas: ' + text);
      } catch (err) {
        alert('Não foi possível copiar. Aqui estão as coordenadas: ' + text);
      }
    } else {
      alert('Coordenadas não disponíveis.');
    }
  };

  // Fecha com Escape e bloqueia scroll da página enquanto modal aberto
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
    };

    if (selectedPonto) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedPonto]);

  // Fecha ao clicar fora do modal
  const onBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  return (
    <div
      className="container mx-auto py-4 pt-20 px-6 md:px-20 lg:px-32 my-20 w-full overflow-hidden"
      id="pontos"
    >
      <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-center">
        Pontos{' '}
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
              key={ponto.id ?? index}
              className="relative flex-shrink-0 group"
              style={{ flex: `0 0 ${100 / cardsToShow}%` }}
            >
              <div
                // clique no cartão abre modal
                onClick={() => openModal(ponto)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') openModal(ponto);
                }}
              >
                <div className="w-full h-64 overflow-hidden rounded-lg shadow-md relative">
                  <img
                    src={ponto.image}
                    alt={ponto.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Botão de mapa sobre a imagem — ao clicar vai direto pro Maps */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); 
                      openInMaps(ponto);
                    }}
                    aria-label={`Abrir ${ponto.title} no mapa`}
                    className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow hover:scale-105"
                    title="Abrir no mapa"
                  >
                    <HiOutlineMapPin className="w-5 h-5 text-orange-600" />
                  </button>

                  <div className="absolute left-0 right-0 bottom-5 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="inline-block bg-white/90 w-3/4 px-4 py-3 shadow-md text-center rounded">
                      <h2 className="text-lg font-semibold text-orange-900">{ponto.title}</h2>
                      <p className="text-sm text-orange-500 mt-1">{ponto.location}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-3 text-center">
                  <p className="text-gray-600 text-sm">{ponto.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedPonto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onMouseDown={onBackdropClick}
          aria-modal="true"
          role="dialog"
          aria-label={`${selectedPonto.title} - detalhes`}
        >
          <div
            ref={modalRef}
            className="bg-white rounded-lg shadow-xl max-w-3xl w-full overflow-auto max-h-[90vh] relative"
          >
            <button
              onClick={closeModal}
              aria-label="Fechar"
              className="absolute right-3 top-3 text-gray-600 hover:text-gray-800 p-1 rounded"
            >
              ✕
            </button>

            <div className="p-6">
              <div className="w-full h-64 overflow-hidden rounded-lg mb-4">
                <img
                  src={selectedPonto.image}
                  alt={selectedPonto.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <h2 className="text-2xl font-bold mb-2">{selectedPonto.title}</h2>
              <p className="text-sm text-orange-600 mb-4">{selectedPonto.location}</p>

              <p className="text-gray-700 mb-4">
                {selectedPonto.longDescription || selectedPonto.description}
              </p>

              <div className="bg-gray-50 p-4 rounded mb-4">
                {selectedPonto.lat != null && selectedPonto.lng != null ? (
                  <>
                    <p className="text-sm text-gray-700 mb-2">
                      Coordenadas: <span className="font-medium">{selectedPonto.lat}, {selectedPonto.lng}</span>
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openInMaps(selectedPonto)}
                        className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                      >
                        Abrir no Google Maps
                      </button>
                      <button
                        onClick={() => copyCoordinates(selectedPonto)}
                        className="px-4 py-2 border rounded hover:bg-gray-100"
                      >
                        Copiar coordenadas
                      </button>
                    </div>
                  </>
                ) : selectedPonto.mapLink ? (
                  <div className="flex gap-2">
                    <a
                      href={selectedPonto.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                    >
                      Ver no mapa
                    </a>
                  </div>
                ) : (
                  <p className="text-sm text-gray-600">Localização não disponível.</p>
                )}
              </div>

              {/* Dados adicionais opcionais */}
              {selectedPonto.details && (
                <ul className="list-disc list-inside text-gray-700 mb-4">
                  {selectedPonto.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              )}

              <div className="flex gap-3 mt-4">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pontos;
